//
//  TBAMedia.h
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAModel.h"

typedef NS_ENUM(NSInteger, TBAMediaType) {
    TBAMediaTypeYouTube,
    TBAMediaTypeCDPhotoThread
};

@interface TBAMediaDetails : TBAModel

@property (nonatomic, strong) NSString *imagePartial;

@end

@interface TBAMedia : TBAModel

@property (nonatomic, assign) TBAMediaType type;
@property (nonatomic, strong) NSString *foreignKey;
@property (nonatomic, strong) TBAMediaDetails *details;

@end
