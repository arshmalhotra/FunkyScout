//
//  TBAKit+EventMethods.m
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAKit+EventMethods.h"
#import "TBATeam.h"
#import "TBAMatch.h"
#import "TBAAward.h"

@implementation TBAKit (EventMethods)

- (NSUInteger)fetchEventsForYear:(NSInteger)year withCompletionBlock:(void (^)(NSArray *events, NSInteger totalCount, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"events/%zd", year];
    
    NSUInteger taskId = [[TBAKit sharedKit] callArrayMethod:apiMethod modelClass:[TBAEvent class] andCompletionBlock:^(NSArray *modelObjects, NSInteger totalCount, NSError *error) {
        completionBlock(modelObjects, totalCount, error);
    }];
    return taskId;
}

- (NSUInteger)fetchEventForEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(TBAEvent *event, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"event/%@", eventKey];
    
    NSUInteger taskId = [[TBAKit sharedKit] callDictionaryMethod:apiMethod modelClass:[TBAEvent class] andCompletionBlock:^(id modelObject, NSError *error) {
        completionBlock(modelObject, error);
    }];
    return taskId;
}

- (NSUInteger)fetchTeamsForEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(NSArray *teams, NSInteger totalCount, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"event/%@/teams", eventKey];
    
    NSUInteger taskId = [[TBAKit sharedKit] callArrayMethod:apiMethod modelClass:[TBATeam class] andCompletionBlock:^(NSArray *modelObjects, NSInteger totalCount, NSError *error) {
        completionBlock(modelObjects, totalCount, error);
    }];
    return taskId;
}

- (NSInteger)fetchMatchesForEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(NSArray *matches, NSInteger totalCount, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"event/%@/matches", eventKey];
    
    NSUInteger taskId = [[TBAKit sharedKit] callArrayMethod:apiMethod modelClass:[TBAMatch class] andCompletionBlock:^(NSArray *modelObjects, NSInteger totalCount, NSError *error) {
        completionBlock(modelObjects, totalCount, error);
    }];
    return taskId;
}

- (NSInteger)fetchStatsForEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(NSDictionary *stats, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"event/%@/stats", eventKey];
    
    NSUInteger taskId = [[TBAKit sharedKit] callDictionaryMethod:apiMethod andCompletionBlock:^(NSDictionary *jsonObject, NSError *error) {
        completionBlock(jsonObject, error);
    }];
    return taskId;
}

- (NSInteger)fetchRankingsForEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(NSArray *rankings, NSInteger totalCount, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"event/%@/rankings", eventKey];
    
    NSUInteger taskId = [[TBAKit sharedKit] callArrayMethod:apiMethod andCompletionBlock:^(NSArray *jsonObjects, NSInteger totalCount, NSError *error) {
        completionBlock(jsonObjects, totalCount, error);
    }];
    return taskId;
}

- (NSInteger)fetchAwardsForEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(NSArray *awards, NSInteger totalCount, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"event/%@/awards", eventKey];
    
    NSUInteger taskId = [[TBAKit sharedKit] callArrayMethod:apiMethod modelClass:[TBAAward class] andCompletionBlock:^(NSArray *modelObjects, NSInteger totalCount, NSError *error) {
        completionBlock(modelObjects, totalCount, error);
    }];
    return taskId;
}

- (NSInteger)fetchDistrictPointsForEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(NSDictionary *points, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"event/%@/district_points", eventKey];
    
    NSUInteger taskId = [[TBAKit sharedKit] callDictionaryMethod:apiMethod andCompletionBlock:^(NSDictionary *jsonObject, NSError *error) {
        completionBlock(jsonObject, error);
    }];
    return taskId;
}

@end