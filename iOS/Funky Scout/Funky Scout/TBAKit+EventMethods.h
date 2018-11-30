//
//  TBAKit+EventMethods.h
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAKit.h"
#import "TBAEvent.h"

@interface TBAKit (EventMethods)

- (NSUInteger)fetchEventsForYear:(NSInteger)year withCompletionBlock:(void (^)(NSArray *events, NSInteger totalCount, NSError *error))completionBlock;
- (NSUInteger)fetchEventForEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(TBAEvent *event, NSError *error))completionBlock;

- (NSUInteger)fetchTeamsForEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(NSArray *teams, NSInteger totalCount, NSError *error))completionBlock;
- (NSInteger)fetchMatchesForEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(NSArray *matches, NSInteger totalCount, NSError *error))completionBlock;
- (NSInteger)fetchStatsForEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(NSDictionary *stats, NSError *error))completionBlock;
- (NSInteger)fetchRankingsForEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(NSArray *rankings, NSInteger totalCount, NSError *error))completionBlock;
- (NSInteger)fetchAwardsForEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(NSArray *awards, NSInteger totalCount, NSError *error))completionBlock;
- (NSInteger)fetchDistrictPointsForEventKey:(NSString *)eventKey withCompletionBlock:(void (^)(NSDictionary *points, NSError *error))completionBlock;

@end
