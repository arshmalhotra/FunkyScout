//
//  TBAKit+TeamMethods.h
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAKit.h"
#import "TBATeam.h"

@interface TBAKit (TeamMethods)

- (NSUInteger)fetchTeamsForPage:(NSInteger)page withCompletionBlock:(void (^)(NSArray *teams, NSInteger totalCount, NSError *error))completionBlock;

- (NSUInteger)fetchTeamForTeamKey:(NSString *)teamKey withCompletionBlock:(void (^)(TBATeam *team, NSError *error))completionBlock;

- (NSUInteger)fetchEventsForTeamKey:(NSString *)teamKey withCompletionBlock:(void (^)(NSArray *events, NSInteger totalCount, NSError *error))completionBlock;
- (NSUInteger)fetchEventsForTeamKey:(NSString *)teamKey andYear:(NSInteger)year withCompletionBlock:(void (^)(NSArray *events, NSInteger totalCount, NSError *error))completionBlock;
- (NSUInteger)fetchHistoryEventsForTeamKey:(NSString *)teamKey withCompletionBlock:(void (^)(NSArray *events, NSInteger totalCount, NSError *error))completionBlock;

- (NSUInteger)fetchAwardsForTeamKey:(NSString *)teamKey withCompletionBlock:(void (^)(NSArray *awards, NSInteger totalCount, NSError *error))completionBlock;
- (NSUInteger)fetchAwardsForTeamKey:(NSString *)teamKey andEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(NSArray *awards, NSInteger totalCount, NSError *error))completionBlock;

- (NSUInteger)fetchMatchesForTeamKey:(NSString *)teamKey andEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(NSArray *matches, NSInteger totalCount, NSError *error))completionBlock;

- (NSUInteger)fetchYearsParticipatedForTeamKey:(NSString *)teamKey withCompletionBlock:(void (^)(NSArray *years, NSInteger totalCount, NSError *error))completionBlock;

- (NSUInteger)fetchMediaForTeamKey:(NSString *)teamKey withCompletionBlock:(void (^)(NSArray *media, NSInteger totalCount, NSError *error))completionBlock;
- (NSUInteger)fetchMediaForTeamKey:(NSString *)teamKey andYear:(NSInteger)year withCompletionBlock:(void (^)(NSArray *media, NSInteger totalCount, NSError *error))completionBlock;

@end
