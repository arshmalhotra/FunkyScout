//
//  TBAMatch.c
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAMatch.h"

@implementation TBAMatchVideo

- (void)updateFromServerResponse:(NSDictionary *)response {
    NSString *type = [self parseStringForKey:@"youtube" fromResponse:response];
    if ([type isEqualToString:@"youtube"]) {
        self.type = TBAVideoTypeYouTube;
    } else if ([type isEqualToString:@"tba"]) {
        self.type = TBAVideoTypeTBA;
    }
    
    self.key = [self parseStringForKey:@"key" fromResponse:response];
}

- (NSURL *)videoUrl {
    NSString *url;
    switch (self.type) {
        case TBAVideoTypeYouTube:
            url = [NSString stringWithFormat:@"https://www.youtube.com/watch?v=%@", self.key];
            break;
        case TBAVideoTypeTBA:
            url = self.key;
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
        self.key = [decoder decodeObjectForKey:@"key"];
    }
    
    return self;
}

- (void)encodeWithCoder:(NSCoder *)encoder {
    [encoder encodeInteger:self.type forKey:@"type"];
    [encoder encodeObject:self.key forKey:@"key"];
}

@end

@implementation TBAMatchAlliance

- (void)updateFromServerResponse:(NSDictionary *)response {
    self.score = [self parseIntegerForKey:@"score" fromResponse:response];
    self.teams = [self parseArrayForKey:@"teams" fromResponse:response];
}

#pragma mark - NSCoding

- (id)initWithCoder:(NSCoder *)decoder {
    self = [super init];
    
    if (self) {
        self.score = [decoder decodeIntegerForKey:@"score"];
        self.teams = [decoder decodeObjectForKey:@"teams"];
    }
    
    return self;
}

- (void)encodeWithCoder:(NSCoder *)encoder {
    [encoder encodeInteger:self.score forKey:@"score"];
    [encoder encodeObject:self.teams forKey:@"teams"];
}

@end

@implementation TBAMatch

- (void)updateFromServerResponse:(NSDictionary *)response {
    self.key = [self parseStringForKey:@"key" fromResponse:response];
    self.compLevel = [self parseStringForKey:@"comp_level" fromResponse:response];
    self.setNumber = [self parseIntegerForKey:@"set_number" fromResponse:response];
    self.matchNumber = [self parseIntegerForKey:@"match_number" fromResponse:response];
    
    NSDictionary *alliances = [self parseDictionaryForKey:@"alliances" fromResponse:response];
    if (alliances && alliances.count != 0) {
        NSDictionary *red = alliances[@"red"];
        if (red) {
            self.redAlliance = [[TBAMatchAlliance alloc] initWithServerResponse:red];
        }
        
        NSDictionary *blue = alliances[@"blue"];
        if (blue) {
            self.blueAlliance = [[TBAMatchAlliance alloc] initWithServerResponse:blue];
        }
    }
    
    self.scoreBreakdown = [self parseDictionaryForKey:@"score_breakdown" fromResponse:response];
    self.eventKey = [self parseStringForKey:@"event_key" fromResponse:response];
    
    NSArray *videos = [self parseArrayForKey:@"videos" fromResponse:response];
    if (videos && videos.count != 0) {
        NSMutableArray *videosArr = [[NSMutableArray alloc] init];
        for (NSDictionary *videoDict in videos) {
            TBAMatchVideo *video = [[TBAMatchVideo alloc] initWithServerResponse:videoDict];
            [videosArr addObject:video];
        }
        self.videos = videosArr;
    }
    
    self.timeString = [self parseStringForKey:@"time_string" fromResponse:response];
    self.time = [NSDate dateWithTimeIntervalSince1970:[self parseDoubleForKey:@"time" fromResponse:response]];
}

#pragma mark - NSCoding

- (id)initWithCoder:(NSCoder *)decoder {
    self = [super init];
    
    if (self) {
        self.key = [decoder decodeObjectForKey:@"key"];
        self.compLevel = [decoder decodeObjectForKey:@"compLevel"];
        self.setNumber = [decoder decodeIntegerForKey:@"setNumber"];
        self.matchNumber = [decoder decodeIntegerForKey:@"matchNumber"];
        self.scoreBreakdown = [decoder decodeObjectForKey:@"scoreBreakdown"];
        self.eventKey = [decoder decodeObjectForKey:@"eventKey"];
        self.videos = [decoder decodeObjectForKey:@"videos"];
        self.timeString = [decoder decodeObjectForKey:@"timeString"];
        self.time = [decoder decodeObjectForKey:@"time"];
        self.redAlliance = [decoder decodeObjectForKey:@"redAlliance"];
        self.blueAlliance = [decoder decodeObjectForKey:@"blueAlliance"];
    }
    
    return self;
}

- (void)encodeWithCoder:(NSCoder *)encoder {
    [encoder encodeObject:self.key forKey:@"key"];
    [encoder encodeObject:self.compLevel forKey:@"compLevel"];
    [encoder encodeInteger:self.setNumber forKey:@"setNumber"];
    [encoder encodeInteger:self.matchNumber forKey:@"matchNumber"];
    [encoder encodeObject:self.scoreBreakdown forKey:@"scoreBreakdown"];
    [encoder encodeObject:self.eventKey forKey:@"eventKey"];
    [encoder encodeObject:self.videos forKey:@"videos"];
    [encoder encodeObject:self.timeString forKey:@"timeString"];
    [encoder encodeObject:self.time forKey:@"time"];
    [encoder encodeObject:self.redAlliance forKey:@"redAlliance"];
    [encoder encodeObject:self.blueAlliance forKey:@"blueAlliance"];
}

@end
