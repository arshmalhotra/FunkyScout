//
//  TBAModel.h
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface TBAModel : NSObject <NSCoding>

- (instancetype)initWithServerResponse:(NSDictionary *)response;
- (void)updateFromServerResponse:(NSDictionary *)response;

@end

@interface TBAModel (ParsingHelpers)

- (NSString *)parseStringForKey:(NSString *)key fromResponse:(NSDictionary *)response;
- (NSNumber *)parseNumberForKey:(NSString *)key fromResponse:(NSDictionary *)response;
- (NSDate *)parseDateForKey:(NSString *)key fromResponse:(NSDictionary *)response;
- (NSDate *)parseDateForKey:(NSString *)key fromResponse:(NSDictionary *)response withFormatter:(NSDateFormatter *)dateFormatter;
- (NSInteger)parseIntegerForKey:(NSString *)key fromResponse:(NSDictionary *)response;
- (double)parseDoubleForKey:(NSString *)key fromResponse:(NSDictionary *)response;
- (BOOL)parseBooleanForKey:(NSString *)key fromResponse:(NSDictionary *)response;
- (NSArray *)parseArrayForKey:(NSString *)key fromResponse:(NSDictionary *)response;
- (NSDictionary *)parseDictionaryForKey:(NSString *)key fromResponse:(NSDictionary *)response;

@end
