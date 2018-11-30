//
//  TeamListTableViewCell.swift
//  Funky Scout
//
//  Created by Arsh Malhotra on 10/30/15.
//  Copyright © 2015 LRT. All rights reserved.
//

import UIKit

class TeamListTableViewCell: UITableViewCell {

    
    @IBOutlet weak var teamNumber: UILabel!
    @IBOutlet weak var teamName: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
