//
//  TBAAward.c
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAAward.h"

@implementation TBAAwardRecipient

- (void)updateFromServerResponse:(NSDictionary *)response {
    self.teamNumber = [self parseIntegerForKey:@"team_number" fromResponse:response];
    self.awardee = [self parseStringForKey:@"awardee" fromResponse:response];
}

#pragma mark - NSCoding

- (id)initWithCoder:(NSCoder *)decoder {
    self = [super init];
    
    if (self) {
        self.teamNumber = [decoder decodeIntegerForKey:@"teamNumber"];
        self.awardee = [decoder decodeObjectForKey:@"awardee"];
    }
    
    return self;
}

- (void)encodeWithCoder:(NSCoder *)encoder {
    [encoder encodeInteger:self.teamNumber forKey:@"teamNumber"];
    [encoder encodeObject:self.awardee forKey:@"awardee"];
}

@end

@implementation TBAAward

- (void)updateFromServerResponse:(NSDictionary *)response {
    self.name = [self parseStringForKey:@"name" fromResponse:response];
    self.awardType = [self parseIntegerForKey:@"award_type" fromResponse:response];
    self.eventKey = [self parseStringForKey:@"event_key" fromResponse:response];
    
    NSArray *recipientList = [self parseArrayForKey:@"recipient_list" fromResponse:response];
    if (recipientList && recipientList.count != 0) {
        NSMutableArray *recipientListArr = [[NSMutableArray alloc] init];
        for (NSDictionary *recipientDict in recipientList) {
            TBAAwardRecipient *recipient = [[TBAAwardRecipient alloc] initWithServerResponse:recipientDict];
            [recipientListArr addObject:recipient];
        }
        self.recipientList = recipientListArr;
    }
    
    self.year = [self parseIntegerForKey:@"year" fromResponse:response];
}

#pragma mark - NSCoding

- (id)initWithCoder:(NSCoder *)decoder {
    self = [super init];
    
    if (self) {
        self.name = [decoder decodeObjectForKey:@"name"];
        self.awardType = [decoder decodeIntegerForKey:@"awardType"];
        self.eventKey = [decoder decodeObjectForKey:@"eventKey"];
        self.recipientList = [decoder decodeObjectForKey:@"recipientList"];
        self.year = [decoder decodeIntegerForKey:@"year"];
    }
    
    return self;
}

- (void)encodeWithCoder:(NSCoder *)encoder {
    [encoder encodeObject:self.name forKey:@"name"];
    [encoder encodeInteger:self.awardType forKey:@"awardType"];
    [encoder encodeObject:self.eventKey forKey:@"eventKey"];
    [encoder encodeObject:self.recipientList forKey:@"recipientList"];
    [encoder encodeInteger:self.year forKey:@"year"];
}

@end