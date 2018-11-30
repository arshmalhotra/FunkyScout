//
//  TBAKit.m
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAKit.h"
#import "TBAModel.h"

#define kLastModifiedString     @"LAST_MODIFIED:"
#define kTBAAPIURL              @"http://www.thebluealliance.com/api/v2/"
#define kErrorDomain            @"com.the-blue-alliance.TBAKit.ErrorDomain"


@interface TBAKit () <NSURLSessionTaskDelegate>

@property (nonatomic, strong) NSURLSession *urlSession;
@property (nonatomic, strong) NSMutableDictionary *requests;

@end

@interface TBARequestWrapper : NSObject

@property (nonatomic, strong) NSURLSessionDataTask *dataTask;
@property (nonatomic, strong) NSMutableData *receivedData;

@property (nonatomic, copy) TBAKitRequestCompletionBlock completionHandler;

@end


@implementation TBAKit

#pragma mark - Class Methods

+ (TBAKit *)sharedKit {
    static dispatch_once_t pred = 0;
    __strong static TBAKit *_sharedKit = nil;
    
    dispatch_once(&pred, ^{
        _sharedKit = [[self alloc] init];
    });
    
    return _sharedKit;
}


#pragma mark - Initialization

- (instancetype)init {
    if (self = [super init]) {
        self.requests = [[NSMutableDictionary alloc] init];
    }
    return self;
}

#pragma mark - Properties

- (NSURLSession *)urlSession {
    if (_urlSession == nil) {
        _urlSession = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                    delegate:self
                                               delegateQueue:nil];
    }
    
    return _urlSession;
}


#pragma mark - Request Methods

- (NSString *)lastModifiedForURL:(NSURL *)url {
    NSString *urlString = [NSString stringWithFormat:@"%@%@", kLastModifiedString, url.description];
    return [[NSUserDefaults standardUserDefaults] stringForKey:urlString];
}

- (void)setLastModified:(NSString *)lastModified forURL:(NSURL *)url {
    NSString *urlString = [NSString stringWithFormat:@"%@%@", kLastModifiedString, url.description];
    [[NSUserDefaults standardUserDefaults] setObject:lastModified forKey:urlString];
    [[NSUserDefaults standardUserDefaults] synchronize];
}

- (NSUInteger)callApiMethod:(NSString *)aMethod andCompletionHandler:(TBAKitRequestCompletionBlock)aHandler  {
    if (self.idHeader == nil) {
        NSError *error = [self errorWithCode:TBAKitErrorCodeInvalidIDHeader andDescription:@"Invalid ID Header"];
        
        if (aHandler) {
            aHandler(nil, nil, error);
        }
        
        return 0;
    }
    
    NSURL *baseURL = [[NSURL alloc] initWithString:kTBAAPIURL];
    NSURL *requestURL = [[NSURL alloc] initWithString:aMethod relativeToURL:baseURL];
    
    NSString *ifModifiedSince = [self lastModifiedForURL:requestURL];
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:requestURL
                                                                cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                            timeoutInterval:15.0f];
    request.HTTPMethod = @"GET";
    [request setValue:self.idHeader forHTTPHeaderField:@"X-TBA-App-Id"];
    if (ifModifiedSince) {
        [request setValue:ifModifiedSince forHTTPHeaderField:@"If-Modified-Since"];
    }
    
    NSURLSessionDataTask *dataTask = [self.urlSession dataTaskWithRequest:request];
    
    TBARequestWrapper *requestWrapper = [[TBARequestWrapper alloc] init];
    
    requestWrapper.dataTask = dataTask;
    requestWrapper.completionHandler = aHandler;
    
    [dataTask resume];
    
    (self.requests)[@(dataTask.taskIdentifier)] = requestWrapper;
    
    return dataTask.taskIdentifier;
}

- (void)cancelRequestWithIdentifier:(NSUInteger)identifier {
    TBARequestWrapper *requestWrapper = (self.requests)[@(identifier)];
    [requestWrapper.dataTask cancel];
    
    [self.requests removeObjectForKey:@(identifier)];
}


#pragma mark - Public Methods

- (NSUInteger)callArrayMethod:(NSString *)method andCompletionBlock:(void (^)(NSArray *, NSInteger, NSError *))completionBlock {
    NSUInteger taskId = [self callApiMethod:method andCompletionHandler:^(NSURLResponse *response, id parsedData, NSError *error) {
        if (error) {
            completionBlock(nil, 0, error);
            
            return;
        }
        
        if (parsedData && [parsedData isKindOfClass:[NSArray class]]) {
            completionBlock(parsedData, [parsedData count], nil);
        } else {
            NSError *error = [self errorWithCode:TBAKitErrorCodeUnexpectedRespose andDescription:@"Unexpected response from server."];
            completionBlock(nil, 0, error);
        }
    }];
    
    return taskId;
}

- (NSUInteger)callArrayMethod:(NSString *)method modelClass:(Class)ModelClass andCompletionBlock:(void (^)(NSArray *, NSInteger, NSError *))completionBlock {
    if ([ModelClass isSubclassOfClass:[TBAModel class]] == NO) {
        NSError *error = [self errorWithCode:TBAKitErrorCodeInvalidModelClass andDescription:@"Invalid Model Class, use a subclass of TBAModel"];
        completionBlock(nil, 0, error);
    }
    
    NSUInteger taskId = [self callArrayMethod:method andCompletionBlock:^(NSArray *jsonObjects, NSInteger totalCount, NSError *error) {
        if (error) {
            completionBlock(nil, 0, error);
            
            return;
        }
        
        NSMutableArray *parsedObjects = [[NSMutableArray alloc] init];
        
        for (id objectData in jsonObjects) {
            if ([objectData isKindOfClass:[NSDictionary class]]) {
                TBAModel *modelObject = [[ModelClass alloc] initWithServerResponse:objectData];
                
                if (modelObject) {
                    [parsedObjects addObject:modelObject];
                }
            }
        }
        
        completionBlock([NSArray arrayWithArray:parsedObjects], totalCount, nil);
    }];
    
    return taskId;
}

- (NSUInteger)callDictionaryMethod:(NSString *)method andCompletionBlock:(void (^)(NSDictionary *jsonObject, NSError *error))completionBlock {
    NSUInteger taskId = [self callApiMethod:method andCompletionHandler:^(NSURLResponse *response, id parsedData, NSError *error) {
        if (error) {
            completionBlock(nil, error);
            
            return;
        }
        
        if (parsedData && [parsedData isKindOfClass:[NSDictionary class]]) {
            completionBlock(parsedData, nil);
        } else {
            NSError *error = [self errorWithCode:TBAKitErrorCodeUnexpectedRespose andDescription:@"Unexpected response from server."];
            completionBlock(nil, error);
        }
    }];
    
    return taskId;
}

- (NSUInteger)callDictionaryMethod:(NSString *)method modelClass:(Class)ModelClass andCompletionBlock:(void (^)(id modelObject, NSError *error))completionBlock {
    if ([ModelClass isSubclassOfClass:[TBAModel class]] == NO) {
        NSError *error = [self errorWithCode:TBAKitErrorCodeInvalidModelClass andDescription:@"Invalid Model Class, use a subclass of TBAModel"];
        completionBlock(nil, error);
    }
    
    NSUInteger taskId = [self callDictionaryMethod:method andCompletionBlock:^(NSDictionary *jsonObject, NSError *error) {
        if (error) {
            completionBlock(nil, error);
            
            return;
        }
        
        TBAModel *modelObject = [[ModelClass alloc] initWithServerResponse:jsonObject];
        
        completionBlock(modelObject, nil);
    }];
    
    return taskId;
}


#pragma mark - <NSURLSessionTaskDelegate> Methods

- (void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)dataTask didReceiveData:(NSData *)data {
    TBARequestWrapper *requestWrapper = (self.requests)[@(dataTask.taskIdentifier)];
    [requestWrapper.receivedData appendData:data];
}

- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(NSError *)sessionError {
    TBARequestWrapper *requestWrapper = (self.requests)[@(task.taskIdentifier)];
    
    NSError *error = nil;
    id parsedData = nil;
    
    if (sessionError) {
        error = sessionError;
    } else {
        parsedData = [NSJSONSerialization JSONObjectWithData:requestWrapper.receivedData
                                                     options:0
                                                       error:&error];
        
        if (parsedData) {
            NSHTTPURLResponse *response = (NSHTTPURLResponse *)task.response;
            NSDictionary *headerFields = response.allHeaderFields;
            NSString *lastModified = headerFields[@"Last-Modified"];
            
            if (lastModified) {
                [self setLastModified:lastModified forURL:task.originalRequest.URL];
            }
        } else if (!error) {
            error = [self errorWithCode:TBAKitErrorCodeJSONParsingFailed andDescription:@"JSON Parsing Failed."];
        }
    }
    
    if (requestWrapper.completionHandler) {
        requestWrapper.completionHandler(task.response, parsedData, error);
    }
    
    [self.requests removeObjectForKey:@(task.taskIdentifier)];
}


#pragma mark - Private Methods

- (NSMutableData *)encodeRequestParams:(NSDictionary *)params {
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:params options:0 error:nil];
    NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    
    NSMutableData *postData = [NSMutableData dataWithData:[jsonString dataUsingEncoding:NSUTF8StringEncoding]];
    
    return postData;
}

- (NSError *)errorWithCode:(NSInteger)code andDescription:(NSString *)description {
    NSDictionary *userInfo = @{
                               NSLocalizedDescriptionKey: description,
                               };
    
    NSError *error = [NSError errorWithDomain:kErrorDomain
                                         code:code
                                     userInfo:userInfo];
    
    return error;
}


@end


@implementation TBARequestWrapper

- (id)init {
    if (self = [super init]) {
        self.receivedData = [[NSMutableData alloc] init];
    }
    
    return self;
}

@end