//
//  TBAKit+MatchMethods.h
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAKit.h"
#import "TBAMatch.h"

@interface TBAKit (MatchMethods)

- (NSUInteger)fetchMatchForMatchKey:(NSString *)matchKey withCompletionBlock:(void (^)(TBAMatch *match, NSError *error))completionBlock;

@end
