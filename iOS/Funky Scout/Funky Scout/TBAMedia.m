//
//  TBAMedia.c
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAMedia.h"

@implementation TBAMediaDetails

- (void)updateFromServerResponse:(NSDictionary *)response {
    self.imagePartial = [self parseStringForKey:@"image_partial" fromResponse:response];
}

#pragma mark - NSCoding

- (id)initWithCoder:(NSCoder *)decoder {
    self = [super init];
    
    if (self) {
        self.imagePartial = [decoder decodeObjectForKey:@"imagePartial"];
    }
    
    return self;
}

- (void)encodeWithCoder:(NSCoder *)encoder {
    [encoder encodeObject:self.imagePartial forKey:@"imagePartial"];
}

@end

@implementation TBAMedia

- (void)updateFromServerResponse:(NSDictionary *)response {
    NSString *type = [self parseStringForKey:@"type" fromResponse:response];
    if ([type isEqualToString:@"youtube"]) {
        self.type = TBAMediaTypeYouTube;
    } else if ([type isEqualToString:@"cdphotothread"]) {
        self.type = TBAMediaTypeCDPhotoThread;
    }
    
    self.foreignKey = [self parseStringForKey:@"foreign_key" fromResponse:response];
    
    NSDictionary *detailsDictionary = [self parseDictionaryForKey:@"details" fromResponse:response];
    if (detailsDictionary && detailsDictionary.count != 0) {
        self.details = [[TBAMediaDetails alloc] initWithServerResponse:detailsDictionary];
    }
}

#pragma mark - NSCoding

- (id)initWithCoder:(NSCoder *)decoder {
    self = [super init];
    
    if (self) {
        self.type = [decoder decodeIntegerForKey:@"type"];
        self.foreignKey = [decoder decodeObjectForKey:@"foreignKey"];
        self.details = [decoder decodeObjectForKey:@"details"];
    }
    
    return self;
}

- (void)encodeWithCoder:(NSCoder *)encoder {
    [encoder encodeInteger:self.type forKey:@"type"];
    [encoder encodeObject:self.foreignKey forKey:@"foreignKey"];
    [encoder encodeObject:self.details forKey:@"details"];
}

@end
