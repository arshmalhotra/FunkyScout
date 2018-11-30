//
//  TBAKit+DistrictMethods.m
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAKit+DistrictMethods.h"
#import "TBAEvent.h"

@implementation TBAKit (DistrictMethods)

- (NSUInteger)fetchDistrictsForYear:(NSInteger)year withCompletionBlock:(void (^)(NSArray *districts, NSInteger totalCount, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"districts/%zd", year];
    
    NSUInteger taskId = [[TBAKit sharedKit] callArrayMethod:apiMethod andCompletionBlock:^(NSArray *jsonObjects, NSInteger totalCount, NSError *error) {
        completionBlock(jsonObjects, totalCount, error);
    }];
    return taskId;
}

- (NSUInteger)fetchEventsForDistrictShort:(NSString *)districtShort forYear:(NSInteger)year withCompletionBlock:(void (^)(NSArray *events, NSInteger totalCount, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"district/%@/%zd/events", districtShort, year];
    
    NSUInteger taskId = [[TBAKit sharedKit] callArrayMethod:apiMethod modelClass:[TBAEvent class] andCompletionBlock:^(NSArray *modelObjects, NSInteger totalCount, NSError *error) {
        completionBlock(modelObjects, totalCount, error);
    }];
    return taskId;
}

- (NSUInteger)fetchRankingsForDistrictShort:(NSString *)districtShort forYear:(NSInteger)year withCompletionBlock:(void (^)(NSArray *rankings, NSInteger totalCount, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"district/%@/%zd/rankings", districtShort, year];
    
    NSUInteger taskId = [[TBAKit sharedKit] callArrayMethod:apiMethod andCompletionBlock:^(NSArray *jsonObjects, NSInteger totalCount, NSError *error) {
        completionBlock(jsonObjects, totalCount, error);
    }];
    return taskId;
}

@end
