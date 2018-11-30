//
//  AllMatchesTableViewCell.swift
//  Funky Scout
//
//  Created by Arsh Malhotra on 1/11/16.
//  Copyright © 2016 LRT. All rights reserved.
//

import UIKit

class AllMatchesTableViewCell: UITableViewCell {

    @IBOutlet weak var blueTeam1: UILabel!
    @IBOutlet weak var blueTeam2: UILabel!
    @IBOutlet weak var blueTeam3: UILabel!
    @IBOutlet weak var redTeam1: UILabel!
    @IBOutlet weak var redTeam2: UILabel!
    @IBOutlet weak var redTeam3: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
    
    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        
        // Configure the view for the selected state
    }
    
}
