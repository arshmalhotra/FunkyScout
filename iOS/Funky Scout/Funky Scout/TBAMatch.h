//
//  TBAMatch.h
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAModel.h"

typedef NS_ENUM(NSInteger, TBAVideoType) {
    TBAVideoTypeYouTube,
    TBAVideoTypeTBA
};

@interface TBAMatchVideo : TBAModel

@property (nonatomic, assign) TBAVideoType type;
@property (nonatomic, strong) NSString *key;

@property (NS_NONATOMIC_IOSONLY, readonly, copy) NSURL *videoUrl;

@end

@interface TBAMatchAlliance : TBAModel

@property (nonatomic, assign) NSInteger score;
@property (nonatomic, strong) NSArray *teams;

@end

@interface TBAMatch : TBAModel

@property (nonatomic, strong) NSString *key;
@property (nonatomic, strong) NSString *compLevel;
@property (nonatomic, assign) NSInteger setNumber;
@property (nonatomic, assign) NSInteger matchNumber;

// No type safety offered for score breakdown, since I don't know how it'll change
@property (nonatomic, strong) NSDictionary *scoreBreakdown;

@property (nonatomic, strong) NSString *eventKey;
@property (nonatomic, strong) NSArray *videos;
@property (nonatomic, strong) NSString *timeString;
@property (nonatomic, strong) NSDate *time;

@property (nonatomic, strong) TBAMatchAlliance *redAlliance;
@property (nonatomic, strong) TBAMatchAlliance *blueAlliance;

@end
