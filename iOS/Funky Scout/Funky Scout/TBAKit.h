//
//  TBAKit.h
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import <Foundation/Foundation.h>

#define kDefaultTimeoutInterval		15.0f


typedef NS_ENUM(NSInteger, TBAKitErrorCode) {
    TBAKitErrorCodeInvalidIDHeader = 0,
    TBAKitErrorCodeInvalidModelClass,
    TBAKitErrorCodeJSONParsingFailed,
    TBAKitErrorCodeUnexpectedRespose
};


@protocol TBAKitRequestDelegate <NSObject>

@optional

- (void)tbakRequestIdentifier:(NSUInteger)requestIdentifier didUploadBytes:(int64_t)bytes outOfBytes:(int64_t)totalBytes;
- (void)tbakRequestIdentifier:(NSUInteger)requestIdentifier didSucceedWithResponse:(NSURLResponse *)response andData:(id)parsedData;
- (void)tbakRequestFailedWithIdentifier:(NSUInteger)requestIdentifier andError:(NSError *)anError;

@end


typedef void (^TBAKitRequestCompletionBlock)(NSURLResponse *response, id parsedData, NSError *error);


@interface TBAKit : NSObject

@property (nonatomic, strong) NSString *idHeader;

+ (TBAKit *)sharedKit;

- (NSUInteger)callApiMethod:(NSString *)aMethod
       andCompletionHandler:(TBAKitRequestCompletionBlock)aHandler;
- (NSUInteger)callArrayMethod:(NSString *)method
           andCompletionBlock:(void (^)(NSArray *jsonObjects, NSInteger totalCount, NSError *error))completionBlock;
- (NSUInteger)callArrayMethod:(NSString *)method
                   modelClass:(Class)ModelClass
           andCompletionBlock:(void (^)(NSArray *modelObjects, NSInteger totalCount, NSError *error))completionBlock;
- (NSUInteger)callDictionaryMethod:(NSString *)method
                andCompletionBlock:(void (^)(NSDictionary *jsonObject, NSError *error))completionBlock;
- (NSUInteger)callDictionaryMethod:(NSString *)method
                        modelClass:(Class)ModelClass
                andCompletionBlock:(void (^)(id modelObject, NSError *error))completionBlock;
- (void)cancelRequestWithIdentifier:(NSUInteger)requestIdentifier;

@end

#import "TBAKit+AllMethods.h"
