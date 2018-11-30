//
//  TBAEvent.c
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAEvent.h"

@implementation TBAEventWebcast

- (void)updateFromServerResponse:(NSDictionary *)response {
    NSString *type = [self parseStringForKey:@"type" fromResponse:response];
    if ([type isEqualToString:@"livestream"]) {
        self.type = TBAWebcastTypeLivestream;
    } else if ([type isEqualToString:@"mms"]) {
        self.type = TBAWebcastTypeMMS;
    } else if ([type isEqualToString:@"rtmp"]) {
        self.type = TBAWebcastTypeRTMP;
    } else if ([type isEqualToString:@"twitch"]) {
        self.type = TBAWebcastTypeTwitch;
    } else if ([type isEqualToString:@"ustream"]) {
        self.type = TBAWebcastTypeUstream;
    } else if ([type isEqualToString:@"youtube"]) {
        self.type = TBAWebcastTypeYoutube;
    } else if ([type isEqualToString:@"iframe"]) {
        self.type = TBAWebcastTypeIFrame;
    } else if ([type isEqualToString:@"html5"]) {
        self.type = TBAWebcastTypeHTML5;
    }
    
    self.channel = [self parseStringForKey:@"channel" fromResponse:response];
    self.file = [self parseStringForKey:@"file" fromResponse:response];
}

- (NSURL *)webcastUrl {
    NSString *url;
    switch (self.type) {
        case TBAWebcastTypeLivestream:
            url = [NSString stringWithFormat:@"http://new.livestream.com/accounts/%@/events/%@", self.channel, self.file];
            break;
        case TBAWebcastTypeMMS:
            url = self.channel;
            break;
        case TBAWebcastTypeRTMP:
            url = [NSString stringWithFormat:@"rtmp://%@%@", self.channel, self.file];
            break;
        case TBAWebcastTypeTwitch:
            url = [NSString stringWithFormat:@"http://www.twitch.tv/%@", self.channel];
            break;
        case TBAWebcastTypeUstream:
            url = [NSString stringWithFormat:@"http://www.ustream.tv/channel/%@", self.channel];
            break;
        case TBAWebcastTypeYoutube:
            url = [NSString stringWithFormat:@"https://www.youtube.com/watch?v=%@", self.channel];
            break;
        case TBAWebcastTypeIFrame:
            url = [self.file stringByReplacingOccurrencesOfString:@"<iframe src=\"" withString:@""];
            NSRange quoteLoc = [url rangeOfString:@"\""];
            url = [url substringToIndex:quoteLoc.location];
            break;
        case TBAWebcastTypeHTML5:
            url = self.channel;
            break;
        default:
            break;
    }
    return [NSURL URLWithString:url];
}

#pragma mark - NSCoding

- (id)initWithCoder:(NSCoder *)decoder {
    self = [super init];
    
    if (self) {
        self.type = [decoder decodeIntegerForKey:@"type"];
        self.channel = [decoder decodeObjectForKey:@"channel"];
        self.file = [decoder decodeObjectForKey:@"file"];
    }
    
    return self;
}

- (void)encodeWithCoder:(NSCoder *)encoder {
    [encoder encodeInteger:self.type forKey:@"type"];
    [encoder encodeObject:self.channel forKey:@"channel"];
    [encoder encodeObject:self.file forKey:@"file"];
}

@end

@implementation TBAEventAlliance

- (void)updateFromServerResponse:(NSDictionary *)response {
    self.picks = [self parseArrayForKey:@"picks" fromResponse:response];
    self.declines = [self parseArrayForKey:@"declines" fromResponse:response];
}

#pragma mark - NSCoding

- (id)initWithCoder:(NSCoder *)decoder {
    self = [super init];
    
    if (self) {
        self.picks = [decoder decodeObjectForKey:@"picks"];
        self.declines = [decoder decodeObjectForKey:@"declines"];
    }
    
    return self;
}

- (void)encodeWithCoder:(NSCoder *)encoder {
    [encoder encodeObject:self.picks forKey:@"picks"];
    [encoder encodeObject:self.declines forKey:@"declines"];
}

@end

@implementation TBAEvent

- (void)updateFromServerResponse:(NSDictionary *)response {
    self.key = [self parseStringForKey:@"key" fromResponse:response];
    self.name = [self parseStringForKey:@"name" fromResponse:response];
    self.shortName = [self parseStringForKey:@"short_name" fromResponse:response];
    self.eventCode = [self parseStringForKey:@"event_code" fromResponse:response];
    self.eventTypeString = [self parseStringForKey:@"event_type_string" fromResponse:response];
    self.eventType = [self parseIntegerForKey:@"event_type" fromResponse:response];
    self.eventDistrictString = [self parseStringForKey:@"event_district_string" fromResponse:response];
    self.eventDistrict = [self parseIntegerForKey:@"event_district" fromResponse:response];
    self.year = [self parseIntegerForKey:@"year" fromResponse:response];
    self.location = [self parseStringForKey:@"location" fromResponse:response];
    self.venueAddress = [self parseStringForKey:@"venue_address" fromResponse:response];
    self.website = [self parseStringForKey:@"website" fromResponse:response];
    self.facebookEid = [self parseStringForKey:@"facebook_eid" fromResponse:response];
    self.official = [self parseBooleanForKey:@"official" fromResponse:response];
    
    
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    dateFormatter.dateFormat = @"yyyy-MM-dd";
    
    self.startDate = [self parseDateForKey:@"start_date" fromResponse:response withFormatter:dateFormatter];
    self.endDate = [self parseDateForKey:@"end_date" fromResponse:response withFormatter:dateFormatter];
    
    NSArray *webcasts = [self parseArrayForKey:@"webcast" fromResponse:response];
    if (webcasts && webcasts.count != 0) {
        NSMutableArray *webcastArr = [[NSMutableArray alloc] init];
        for (NSDictionary *webcastDict in webcasts) {
            TBAEventWebcast *webcast = [[TBAEventWebcast alloc] initWithServerResponse:webcastDict];
            [webcastArr addObject:webcast];
        }
        self.webcast = webcastArr;
    }
    
    NSArray *alliances = [self parseArrayForKey:@"alliances" fromResponse:response];
    if (alliances && alliances.count != 0) {
        NSMutableArray *allianceArr = [[NSMutableArray alloc] init];
        for (NSDictionary *allianceDict in alliances) {
            TBAEventAlliance *alliance = [[TBAEventAlliance alloc] initWithServerResponse:allianceDict];
            [allianceArr addObject:alliance];
        }
        self.alliances = allianceArr;
    }
}

#pragma mark - NSCoding

- (id)initWithCoder:(NSCoder *)decoder {
    self = [super init];
    
    if (self) {
        self.key = [decoder decodeObjectForKey:@"key"];
        self.name = [decoder decodeObjectForKey:@"name"];
        self.shortName = [decoder decodeObjectForKey:@"shortName"];
        self.eventCode = [decoder decodeObjectForKey:@"eventCode"];
        self.eventTypeString = [decoder decodeObjectForKey:@"eventTypeString"];
        self.eventType = [decoder decodeIntegerForKey:@"eventType"];
        self.eventDistrictString = [decoder decodeObjectForKey:@"eventDistrictString"];
        self.eventDistrict = [decoder decodeIntegerForKey:@"eventDistrict"];
        self.year = [decoder decodeIntegerForKey:@"year"];
        self.location = [decoder decodeObjectForKey:@"location"];
        self.venueAddress = [decoder decodeObjectForKey:@"venueAddress"];
        self.website = [decoder decodeObjectForKey:@"website"];
        self.facebookEid = [decoder decodeObjectForKey:@"facebookEid"];
        self.official = [decoder decodeBoolForKey:@"official"];
        self.startDate = [decoder decodeObjectForKey:@"startDate"];
        self.endDate = [decoder decodeObjectForKey:@"endDate"];
        self.webcast = [decoder decodeObjectForKey:@"webcast"];
        self.alliances = [decoder decodeObjectForKey:@"alliances"];
    }
    
    return self;
}

- (void)encodeWithCoder:(NSCoder *)encoder {
    [encoder encodeObject:self.key forKey:@"key"];
    [encoder encodeObject:self.name forKey:@"name"];
    [encoder encodeObject:self.shortName forKey:@"shortName"];
    [encoder encodeObject:self.eventCode forKey:@"eventCode"];
    [encoder encodeObject:self.eventTypeString forKey:@"eventTypeString"];
    [encoder encodeInteger:self.eventType forKey:@"eventType"];
    [encoder encodeObject:self.eventDistrictString forKey:@"eventDistrictString"];
    [encoder encodeInteger:self.eventDistrict forKey:@"eventDistrict"];
    [encoder encodeInteger:self.year forKey:@"year"];
    [encoder encodeObject:self.location forKey:@"location"];
    [encoder encodeObject:self.venueAddress forKey:@"venueAddress"];
    [encoder encodeObject:self.website forKey:@"website"];
    [encoder encodeObject:self.facebookEid forKey:@"facebookEid"];
    [encoder encodeBool:self.official forKey:@"official"];
    [encoder encodeObject:self.startDate forKey:@"startDate"];
    [encoder encodeObject:self.endDate forKey:@"endDate"];
    [encoder encodeObject:self.webcast forKey:@"webcast"];
    [encoder encodeObject:self.alliances forKey:@"alliances"];
}

@end