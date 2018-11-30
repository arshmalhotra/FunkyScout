//
//  AllMatchesViewController.swift
//  Funky Scout
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

import UIKit

import Parse

class AllMatchesTableViewController: UITableViewController {
    
    //MARK: Properties
    
    @IBOutlet weak var allMatches: UITableView!
    
    var matchList = [TBATeam]()
    var currentTeamNumber = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //        self.tableView.registerClass(TeamListTableViewCell.classForCoder(), forCellReuseIdentifier: "TeamListTableViewCell")
        //
        //        let nibName = UINib(nibName: "TeamListTableViewCell", bundle:nil)
        //        self.tableView.registerNib(nibName, forCellReuseIdentifier: "TeamListTableViewCell")
        
        // Load the data.
        NSLog("running getTeamInfo()")
        getTeamInfo()
        
    }
    
    func getTeamInfo() {
        NSLog("In gTI()")
        TBAKit.sharedKit().idHeader = "frc846:FunkyScout:v2"
        NSLog("established header")
        TBAKit.sharedKit().fetchTeamsForEventKey("2015cacg") { (teams, totalCount, error) -> Void in
            NSLog("established function inside gTI()")
            if (error != nil) {
                NSLog("Unable to fetch event - %@", error.localizedDescription)
                return
            }
            
            NSLog("past error")
            NSLog(String(totalCount))
            
            for index in 0...(totalCount-1) {
                
                self.matchList.append((teams[index] as? TBATeam)!)
                
                NSLog(String(self.matchList.count))
            }
            
            for index in 0...(totalCount-2) {
                for subIndex in index+1...(totalCount-1) {
                    if (self.matchList[index].teamNumber > self.matchList[subIndex].teamNumber) {
                        let temp = self.matchList[index]
                        self.matchList[index] = self.matchList[subIndex]
                        self.matchList[subIndex] = temp
                    }
                }
            }
            
            NSLog(String(self.matchList.count))
            self.allMatches.reloadData()
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - Table view data source
    
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        NSLog("inside the table view function of number of rows")
        NSLog(String(self.matchList.count))
        return self.matchList.count
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        
        // Table view cells are reused and should be dequeued using a cell identifier.
        let cellIdentifier = "matchListTableViewCell"
        let cell = tableView.dequeueReusableCellWithIdentifier(cellIdentifier, forIndexPath: indexPath) as! AllMatchesTableViewCell
        
        // Fetches the appropriate meal for the data source layout.
        let team = self.matchList[indexPath.row]
        
        NSLog(String(team.teamNumber))
        NSLog(team.nickname)
        
        cell.blueTeam1.text = String(team.teamNumber)
        cell.blueTeam2.text = String(team.teamNumber)
        cell.blueTeam3.text = String(team.teamNumber)
        
        return cell
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        NSLog("You selected cell #\(indexPath.row)!")
        currentTeamNumber = String(self.matchList[indexPath.row].teamNumber)
        let submit = PFObject(className: "Pit_Scout")
        submit["teamNumber"] = currentTeamNumber
        submit.saveInBackgroundWithBlock {
            (success: Bool, error: NSError?) -> Void in
            if (success) {
                print("Success")
            } else {
                print("Oops! Something went wrong.")
            }
        }
    }
}