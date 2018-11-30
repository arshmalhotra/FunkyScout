//
//  IGLDropDownItem.h
//  Funky Scout
//
//  Created by Arsh Malhotra on 11/2/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface IGLDropDownItem : UIControl

@property (nonatomic, assign) NSInteger index;
@property (nonatomic, strong) UIImage *iconImage;
@property (nonatomic, strong) id object;
@property (nonatomic, copy) NSString *text;

@property (nonatomic, strong, readonly) UILabel *textLabel;

@property (nonatomic, assign) CGFloat paddingLeft;

- (id)copyWithZone:(NSZone *)zone;

@end
