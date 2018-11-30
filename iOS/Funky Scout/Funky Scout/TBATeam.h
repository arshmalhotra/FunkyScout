//
//  TBATeam.h
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAModel.h"

@interface TBATeam : TBAModel

@property (nonatomic, strong) NSString *website;
@property (nonatomic, strong) NSString *name;
@property (nonatomic, strong) NSString *locality;
@property (nonatomic, strong) NSString *region;
@property (nonatomic, strong) NSString *countryName;
@property (nonatomic, strong) NSString *location;
@property (nonatomic, assign) NSInteger teamNumber;
@property (nonatomic, strong) NSString *key;
@property (nonatomic, strong) NSString *nickname;
@property (nonatomic, assign) NSInteger rookieYear;

@end
