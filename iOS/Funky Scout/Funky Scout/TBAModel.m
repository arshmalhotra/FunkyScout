//
//  TBAModel.c
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAModel.h"

@implementation TBAModel

- (id)initWithServerResponse:(NSDictionary *)response {
    if (self = [super init]) {
        [self updateFromServerResponse:response];
    }
    
    return self;
}

- (void)updateFromServerResponse:(NSDictionary *)response {
    // Implement in subclasses
}


#pragma mark - NSCoding

- (id)initWithCoder:(NSCoder *)decoder {
    self = [super init];
    
    return self;
}

- (void)encodeWithCoder:(NSCoder *)encoder {
    
}


#pragma mark - Parsing Helpers

- (NSString *)parseStringForKey:(NSString *)key fromResponse:(NSDictionary *)response {
    id string = response[key];
    if (string && [string isKindOfClass:[NSString class]]) {
        return string;
    } else {
        return nil;
    }
}

- (NSNumber *)parseNumberForKey:(NSString *)key fromResponse:(NSDictionary *)response {
    static NSNumberFormatter *numberFormatter = nil;
    
    if (numberFormatter == nil) {
        numberFormatter = [[NSNumberFormatter alloc] init];
    }
    
    id number = response[key];
    if (number && [number isKindOfClass:[NSNumber class]]) {
        return number;
    } else if (number && [number isKindOfClass:[NSString class]]) {
        return [numberFormatter numberFromString:number];
    } else {
        return nil;
    }
}

- (NSDate *)parseDateForKey:(NSString *)key fromResponse:(NSDictionary *)response {
    static NSDateFormatter *dateFormatter = nil;
    static NSDateFormatter *dateFormatter3 = nil;
    
    if (dateFormatter == nil) {
        dateFormatter = [[NSDateFormatter alloc] init];
        dateFormatter.locale = [[NSLocale alloc] initWithLocaleIdentifier:@"en_US_POSIX"];
        dateFormatter.timeZone = [NSTimeZone timeZoneWithAbbreviation:@"GMT"];
        dateFormatter.dateFormat = @"yyyy-MM-dd HH:mm:ss";
    }
    
    if (dateFormatter3 == nil) {
        dateFormatter3 = [[NSDateFormatter alloc] init];
        dateFormatter3.locale = [[NSLocale alloc] initWithLocaleIdentifier:@"en_US_POSIX"];
        dateFormatter3.timeZone = [NSTimeZone timeZoneWithAbbreviation:@"GMT"];
        dateFormatter3.dateFormat = @"yyyy-MM-dd'T'HH:mm:ssZZZZZ";
    }
    
    NSDate *parsedDate = [self parseDateForKey:key fromResponse:response withFormatter:dateFormatter];
    
    if (!parsedDate) {
        parsedDate = [self parseDateForKey:key fromResponse:response withFormatter:dateFormatter3];
    }
    
    return parsedDate;
}

- (NSDate *)parseDateForKey:(NSString *)key fromResponse:(NSDictionary *)response withFormatter:(NSDateFormatter *)dateFormatter {
    id string = response[key];
    if (string && [string isKindOfClass:[NSString class]]) {
        return [dateFormatter dateFromString:string];
    } else {
        return nil;
    }
}

- (NSInteger)parseIntegerForKey:(NSString *)key fromResponse:(NSDictionary *)response {
    id object = response[key];
    if (object && [object respondsToSelector:@selector(integerValue)]) {
        return [object integerValue];
    } else {
        return 0;
    }
}

- (double)parseDoubleForKey:(NSString *)key fromResponse:(NSDictionary *)response {
    id object = response[key];
    if (object && [object respondsToSelector:@selector(doubleValue)]) {
        return [object doubleValue];
    } else {
        return 0;
    }
}

- (BOOL)parseBooleanForKey:(NSString *)key fromResponse:(NSDictionary *)response {
    id object = response[key];
    if (object && [object respondsToSelector:@selector(boolValue)]) {
        return [object boolValue];
    } else {
        return NO;
    }
}

- (NSArray *)parseArrayForKey:(NSString *)key fromResponse:(NSDictionary *)response {
    id array = response[key];
    if (array && [array isKindOfClass:[NSArray class]]) {
        return array;
    } else {
        return nil;
    }
}

- (NSDictionary *)parseDictionaryForKey:(NSString *)key fromResponse:(NSDictionary *)response {
    id dictionary = response[key];
    if (dictionary && [dictionary isKindOfClass:[NSDictionary class]]) {
        return dictionary;
    } else {
        return nil;
    }
}


@end
