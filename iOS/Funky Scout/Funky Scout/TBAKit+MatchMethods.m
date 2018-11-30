//
//  TBAKit+MatchMethods.m
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAKit+MatchMethods.h"

@implementation TBAKit (MatchMethods)

- (NSUInteger)fetchMatchForMatchKey:(NSString *)matchKey withCompletionBlock:(void (^)(TBAMatch *match, NSError *error))completionBlock {
    NSString *apiMethod = [NSString stringWithFormat:@"match/%@", matchKey];
    
    NSUInteger taskId = [self callDictionaryMethod:apiMethod modelClass:[TBAMatch class] andCompletionBlock:^(id modelObject, NSError *error) {
        completionBlock(modelObject, error);
    }];
    
    return taskId;
}

@end
