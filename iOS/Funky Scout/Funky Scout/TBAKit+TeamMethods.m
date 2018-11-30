//
//  TBAKit+TeamMethods.m
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAKit+TeamMethods.h"
#import "TBAEvent.h"
#import "TBAAward.h"
#import "TBAMatch.h"
#import "TBAMedia.h"

@implementation TBAKit (TeamMethods)

- (NSUInteger)fetchTeamsForPage:(NSInteger)page withCompletionBlock:(void (^)(NSArray *teams, NSInteger totalCount, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"teams/%zd", page];
    
    NSUInteger taskId = [[TBAKit sharedKit] callArrayMethod:apiMethod modelClass:[TBATeam class] andCompletionBlock:^(NSArray *modelObjects, NSInteger totalCount, NSError *error) {
        completionBlock(modelObjects, totalCount, error);
    }];
    return taskId;
}

- (NSUInteger)fetchTeamForTeamKey:(NSString *)teamKey withCompletionBlock:(void (^)(TBATeam *team, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"team/%@", teamKey];
    
    NSUInteger taskId = [[TBAKit sharedKit] callDictionaryMethod:apiMethod modelClass:[TBATeam class] andCompletionBlock:^(id modelObject, NSError *error) {
        completionBlock(modelObject, error);
    }];
    return taskId;
}

- (NSUInteger)fetchEventsForTeamKey:(NSString *)teamKey withCompletionBlock:(void (^)(NSArray *events, NSInteger totalCount, NSError *error))completionBlock {
    return [self fetchEventsForTeamKey:teamKey andYear:-1 withCompletionBlock:completionBlock];
}

- (NSUInteger)fetchEventsForTeamKey:(NSString *)teamKey andYear:(NSInteger)year withCompletionBlock:(void (^)(NSArray *events, NSInteger totalCount, NSError *error))completionBlock {
    NSString *apiMethod;
    if (year == -1) {
        apiMethod = [NSString stringWithFormat:@"team/%@/events", teamKey];
    } else {
        apiMethod = [NSString stringWithFormat:@"team/%@/%zd/events", teamKey, year];
    }
    
    NSUInteger taskId = [[TBAKit sharedKit] callArrayMethod:apiMethod modelClass:[TBAEvent class] andCompletionBlock:^(NSArray *modelObjects, NSInteger totalCount, NSError *error) {
        completionBlock(modelObjects, totalCount, error);
    }];
    return taskId;
}

- (NSUInteger)fetchHistoryEventsForTeamKey:(NSString *)teamKey withCompletionBlock:(void (^)(NSArray *events, NSInteger totalCount, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"team/%@/history/events", teamKey];;
    
    NSUInteger taskId = [[TBAKit sharedKit] callArrayMethod:apiMethod modelClass:[TBAEvent class] andCompletionBlock:^(NSArray *modelObjects, NSInteger totalCount, NSError *error) {
        completionBlock(modelObjects, totalCount, error);
    }];
    return taskId;
}

- (NSUInteger)fetchAwardsForTeamKey:(NSString *)teamKey withCompletionBlock:(void (^)(NSArray *awards, NSInteger totalCount, NSError *error))completionBlock {
    return [self fetchAwardsForTeamKey:teamKey andEventKey:nil withCompletionBlock:completionBlock];
}

- (NSUInteger)fetchAwardsForTeamKey:(NSString *)teamKey andEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(NSArray *awards, NSInteger totalCount, NSError *error))completionBlock {
    NSString *apiMethod;
    if (eventKey) {
        apiMethod = [NSString stringWithFormat:@"team/%@/event/%@/awards", teamKey, eventKey];
    } else {
        apiMethod = [NSString stringWithFormat:@"team/%@/history/awards", teamKey];
    }
    
    NSUInteger taskId = [[TBAKit sharedKit] callArrayMethod:apiMethod modelClass:[TBAAward class] andCompletionBlock:^(NSArray *modelObjects, NSInteger totalCount, NSError *error) {
        completionBlock(modelObjects, totalCount, error);
    }];
    return taskId;
}

- (NSUInteger)fetchMatchesForTeamKey:(NSString *)teamKey andEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(NSArray *matches, NSInteger totalCount, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"team/%@/event/%@/matches", teamKey, eventKey];
    
    NSUInteger taskId = [[TBAKit sharedKit] callArrayMethod:apiMethod modelClass:[TBAMatch class] andCompletionBlock:^(NSArray *modelObjects, NSInteger totalCount, NSError *error) {
        completionBlock(modelObjects, totalCount, error);
    }];
    return taskId;
}

- (NSUInteger)fetchYearsParticipatedForTeamKey:(NSString *)teamKey withCompletionBlock:(void (^)(NSArray *years, NSInteger totalCount, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"team/%@/years_participated", teamKey];
    
    NSUInteger taskId = [[TBAKit sharedKit] callArrayMethod:apiMethod andCompletionBlock:^(NSArray *jsonObjects, NSInteger totalCount, NSError *error) {
        completionBlock(jsonObjects, totalCount, error);
    }];
    return taskId;
}

- (NSUInteger)fetchMediaForTeamKey:(NSString *)teamKey withCompletionBlock:(void (^)(NSArray *media, NSInteger totalCount, NSError *error))completionBlock {
    return [self fetchMediaForTeamKey:teamKey andYear:-1 withCompletionBlock:completionBlock];
}

- (NSUInteger)fetchMediaForTeamKey:(NSString *)teamKey andYear:(NSInteger)year withCompletionBlock:(void (^)(NSArray *media, NSInteger totalCount, NSError *error))completionBlock {
    NSString *apiMethod;
    if (year == -1) {
        apiMethod = [NSString stringWithFormat:@"team/%@/media", teamKey];
    } else {
        apiMethod = [NSString stringWithFormat:@"team/%@/%zd/media", teamKey, year];
    }
    
    NSUInteger taskId = [[TBAKit sharedKit] callArrayMethod:apiMethod modelClass:[TBAMedia class] andCompletionBlock:^(NSArray *modelObjects, NSInteger totalCount, NSError *error) {
        completionBlock(modelObjects, totalCount, error);
    }];
    return taskId;
}


@end