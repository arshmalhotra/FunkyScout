//
//  TBAEvent.h
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAModel.h"

typedef NS_ENUM(NSInteger, TBAWebcastType) {
    TBAWebcastTypeLivestream,
    TBAWebcastTypeMMS,
    TBAWebcastTypeRTMP,
    TBAWebcastTypeTwitch,
    TBAWebcastTypeUstream,
    TBAWebcastTypeYoutube,
    TBAWebcastTypeIFrame,
    TBAWebcastTypeHTML5
};

@interface TBAEventWebcast: TBAModel

@property (nonatomic, assign) TBAWebcastType type;
@property (nonatomic, strong) NSString *channel;
@property (nonatomic, strong) NSString *file;

@property (NS_NONATOMIC_IOSONLY, readonly, copy) NSURL *webcastUrl;

@end

@interface TBAEventAlliance : TBAModel

@property (nonatomic, strong) NSArray *picks;
@property (nonatomic, strong) NSArray *declines;

@end

typedef NS_ENUM(NSInteger, TBAEventType) {
    TBAEventTypeRegional = 0,
    TBAEventTypeDistrict = 1,
    TBAEventTypeDistrictCMP = 2,
    TBAEventTypeCMPDivision = 3,
    TBAEventTypeCMPFinals = 4,
    TBAEventTypeOffseason = 99,
    TBAEventTypePreseason = 100,
    TBAEventTypeUnlabeled = -1
};

typedef NS_ENUM(NSInteger, TBADistrictType) {
    TBADistrictTypeNoDistrict = 0,
    TBADistrictTypeMichigan = 1,
    TBADistrictTypeMidAtlantic = 2,
    TBADistrictTypeNewEngland = 3,
    TBADistrictTypePacificNorthwest = 4,
    TBADistrictTypeIndiana = 5
};

@interface TBAEvent : TBAModel

@property (nonatomic, strong) NSString *key;
@property (nonatomic, strong) NSString *name;
@property (nonatomic, strong) NSString *shortName;
@property (nonatomic, strong) NSString *eventCode;
@property (nonatomic, strong) NSString *eventTypeString;
@property (nonatomic, assign) TBAEventType eventType;
@property (nonatomic, strong) NSString *eventDistrictString;
@property (nonatomic, assign) TBADistrictType eventDistrict;
@property (nonatomic, assign) NSInteger year;
@property (nonatomic, strong) NSString *location;
@property (nonatomic, strong) NSString *venueAddress;
@property (nonatomic, strong) NSString *website;
@property (nonatomic, strong) NSString *facebookEid;
@property (nonatomic, assign) BOOL official;
@property (nonatomic, strong) NSDate *startDate;
@property (nonatomic, strong) NSDate *endDate;

@property (nonatomic, strong) NSArray *webcast;
@property (nonatomic, strong) NSArray *alliances;

@end