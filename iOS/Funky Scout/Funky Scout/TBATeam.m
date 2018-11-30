//
//  TBATeam.c
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBATeam.h"

@implementation TBATeam

- (void)updateFromServerResponse:(NSDictionary *)response {
    self.website = [self parseStringForKey:@"website" fromResponse:response];
    self.name = [self parseStringForKey:@"name" fromResponse:response];
    self.locality = [self parseStringForKey:@"locality" fromResponse:response];
    self.region = [self parseStringForKey:@"region" fromResponse:response];
    self.countryName = [self parseStringForKey:@"country_name" fromResponse:response];
    self.location = [self parseStringForKey:@"location" fromResponse:response];
    self.teamNumber = [self parseIntegerForKey:@"team_number" fromResponse:response];
    self.key = [self parseStringForKey:@"key" fromResponse:response];
    self.nickname = [self parseStringForKey:@"nickname" fromResponse:response];
    self.rookieYear = [self parseIntegerForKey:@"rookie_year" fromResponse:response];
}

#pragma mark - NSCoding

- (id)initWithCoder:(NSCoder *)decoder {
    self = [super init];
    
    if (self) {
        self.website = [decoder decodeObjectForKey:@"website"];
        self.name = [decoder decodeObjectForKey:@"name"];
        self.locality = [decoder decodeObjectForKey:@"locality"];
        self.countryName = [decoder decodeObjectForKey:@"countryName"];
        self.location = [decoder decodeObjectForKey:@"location"];
        self.teamNumber = [decoder decodeIntegerForKey:@"teamNumber"];
        self.key = [decoder decodeObjectForKey:@"key"];
        self.nickname = [decoder decodeObjectForKey:@"nickname"];
        self.rookieYear = [decoder decodeIntegerForKey:@"rookieYear"];
    }
    
    return self;
}

- (void)encodeWithCoder:(NSCoder *)encoder {
    [encoder encodeObject:self.website forKey:@"website"];
    [encoder encodeObject:self.name forKey:@"name"];
    [encoder encodeObject:self.locality forKey:@"locality"];
    [encoder encodeObject:self.countryName forKey:@"countryName"];
    [encoder encodeObject:self.location forKey:@"location"];
    [encoder encodeInteger:self.teamNumber forKey:@"teamNumber"];
    [encoder encodeObject:self.key forKey:@"key"];
    [encoder encodeObject:self.nickname forKey:@"nickname"];
    [encoder encodeInteger:self.rookieYear forKey:@"rookieYear"];
}

@end
