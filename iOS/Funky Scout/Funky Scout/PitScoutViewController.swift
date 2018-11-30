//
//  PitScoutViewController.swift
//  Funky Scout
//
//  Created by Arsh Malhotra on 10/31/15.
//  Copyright © 2015 LRT. All rights reserved.
//

import UIKit

import Parse

class PitScoutViewController: UIViewController {
    
    var submitButton = UIButton()
    var textFieldArray = [UITextField]()
    var submitQuery = PFQuery(className: "Pit_Scout")
    var submitObjectID = NSString?()
    
    var drivetrainData = ["Mecanum",
        "West Coast Drive",
        "Swerve Drive",
        "Other"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Getting the id of the last entry to be able to update the entry
        submitQuery.orderByDescending("createdAt")
        submitQuery.getFirstObjectInBackgroundWithBlock {
            (object: PFObject?, error: NSError?) -> Void in
            if error == nil || object != nil {
                self.submitObjectID = object?.objectId
                print(object)
            } else {
                print(error)
            }
            print("successfully")
            print(self.submitObjectID!)
        }
        
        // Creating form
        textFieldForm()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func preferredStatusBarStyle() -> UIStatusBarStyle {
    return .LightContent
    }
    
    override func touchesBegan(touches: Set<UITouch>, withEvent event: UIEvent?){
        view.endEditing(true)
        super.touchesBegan(touches, withEvent: event)
    }
    
    override func viewWillDisappear(animated: Bool) {
        let viewControllers: [UIViewController] = self.navigationController!.viewControllers as! [UIViewController]
        
        if viewControllers.indexOf(self) == nil {
            let submit = PFQuery(className:"Pit_Scout")
            submit.getObjectInBackgroundWithId(String(self.submitObjectID!)) {
                (submitObject: PFObject?, error: NSError?) -> Void in
                if error != nil {
                    print(error)
                } else if let submitObject = submitObject {
                    submitObject.deleteInBackground()
                }
            }
            
        }
        
        super.viewWillDisappear(animated)
    }
    
    func textFieldForm() {
        
        let drivetrain = UITextField(frame: CGRect(x: 10, y: 75, width: 200.00, height: 40.00))
        drivetrain.placeholder = "Drivetrain?"
        
        let maxStack = UITextField()
        maxStack.placeholder = "Max Stack Height?"
        
        let numStacks = UITextField()
        numStacks.placeholder = "Stacks per match?"
        
        let coop = UITextField()
        coop.placeholder = "Co-op Totes?"
        
        let speed = UITextField()
        speed.placeholder = "Speed (ft/sec)"
        
        let secure = UITextField()
        secure.placeholder = "Stack Security?"
        
        textFieldArray += [drivetrain, maxStack, numStacks, coop, speed, secure]
        
        for index in 0...(textFieldArray.count-1) {
            if (index > 0) {
                textFieldArray[index].frame = CGRect(x: 10,
                    y: 75 + ((textFieldArray[index-1].frame.size.height + CGFloat(10)) * CGFloat(index)),
                    width: textFieldArray[index-1].frame.size.width,
                    height: textFieldArray[index-1].frame.size.height)
            }
            
            textFieldArray[index].tintColor = UIColor.blueColor()
            
            let border = CALayer()
            let width = CGFloat(2.0)
            border.borderColor = UIColor.lightGrayColor().CGColor
            border.frame = CGRect(x: 0,
                y: textFieldArray[index].frame.size.height - width,
                width: textFieldArray[index].frame.size.width,
                height: textFieldArray[index].frame.size.height)
            
            border.borderWidth = width
            textFieldArray[index].layer.addSublayer(border)
            textFieldArray[index].layer.masksToBounds = true
        }
        
        for index in 0...(textFieldArray.count-1) {
            self.view.addSubview(textFieldArray[index])
        }
        
        // Submit button
        submitButton.frame = CGRect (x: 10,
            y: 75 + ((textFieldArray[textFieldArray.count-1].frame.size.height + CGFloat(10)) * CGFloat(textFieldArray.count)),
            width: 100,
            height: 50)
        submitButton.backgroundColor = UIColor(red: 0.776, green: 0.157, blue: 0.157, alpha: 1)
        submitButton.setTitle("Submit", forState: UIControlState.Normal)
        submitButton.addTarget(self, action: "submitForm", forControlEvents: UIControlEvents.TouchUpInside)
        
        let border = CALayer()
        let width = CGFloat(2.0)
        border.borderColor = UIColor.lightGrayColor().CGColor
        border.frame = CGRect(x: 0,
            y: submitButton.frame.size.height - width,
            width: submitButton.frame.size.width,
            height: submitButton.frame.size.height)
        
        border.borderWidth = width
        submitButton.layer.addSublayer(border)
        submitButton.layer.masksToBounds = true
        
        self.view.addSubview(submitButton)
    }
    
    func submitForm () {
        var notEmpty = true
        for(var i=0; i<textFieldArray.count; i++) {
            var field = textFieldArray[i]
            if (field.text == "") {
                notEmpty = false
            }
        }
        if (notEmpty){
            let submit = PFQuery(className:"Pit_Scout")
            submit.getObjectInBackgroundWithId(String(self.submitObjectID!)) {
                (submitObject: PFObject?, error: NSError?) -> Void in
                if error != nil {
                    print(error)
                } else if let submitObject = submitObject {
                    submitObject["drivetrain"] = self.textFieldArray[0].text?.uppercaseString
                    submitObject["maxStack"] = self.textFieldArray[1].text
                    submitObject["numStacks"] = self.textFieldArray[2].text
                    submitObject["coop"] = self.textFieldArray[3].text?.uppercaseString
                    submitObject["speed"] = self.textFieldArray[4].text
                    submitObject["secure"] = self.textFieldArray[4].text?.uppercaseString
                    submitObject.saveInBackgroundWithBlock {
                        (success: Bool, error: NSError?) -> Void in
                        if (success) {
                            print("Success")
                            for(var i=0; i<self.textFieldArray.count; i++) {
                                var field = self.textFieldArray[i]
                                field.text = ""
                            }
                        } else {
                            print("Oops! Something went wrong.")
                        }
                    }
                }
            }

            
        } else {
            let alertController = UIAlertController(title: "Finish the form!", message:
                "I'm watching you now finish the form!", preferredStyle: UIAlertControllerStyle.Alert)
            alertController.addAction(UIAlertAction(title: "OK :(", style: UIAlertActionStyle.Default,handler: nil))
            
            self.presentViewController(alertController, animated: true, completion: nil)
        }

        // self.presentViewController(TeamListTableViewController, animated: true, completion: nil)
    }
    
}