//
//  TBAKit+DistrictMethods.h
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAKit.h"

@interface TBAKit (DistrictMethods)

- (NSUInteger)fetchDistrictsForYear:(NSInteger)year withCompletionBlock:(void (^)(NSArray *districts, NSInteger totalCount, NSError *error))completionBlock;

- (NSUInteger)fetchEventsForDistrictShort:(NSString *)districtShort forYear:(NSInteger)year withCompletionBlock:(void (^)(NSArray *events, NSInteger totalCount, NSError *error))completionBlock;
- (NSUInteger)fetchRankingsForDistrictShort:(NSString *)districtShort forYear:(NSInteger)year withCompletionBlock:(void (^)(NSArray *rankings, NSInteger totalCount, NSError *error))completionBlock;

@end
