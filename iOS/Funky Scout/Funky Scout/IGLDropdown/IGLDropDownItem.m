//
//  IGLDropDownItem.m
//  Funky Scout
//
//  Created by Arsh Malhotra on 11/2/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "IGLDropDownItem.h"

@interface IGLDropDownItem ()

@property (nonatomic, strong) UIImageView *iconImageView;
@property (nonatomic, strong) UIView *bgView;
@property (nonatomic, strong) UILabel *textLabel;

@end

@implementation IGLDropDownItem

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self commonInit];
    }
    return self;
}

- (instancetype)initWithCoder:(NSCoder *)aDecoder
{
    self = [super initWithCoder:aDecoder];
    if (self) {
        [self commonInit];
    }
    return self;
}

- (void)commonInit
{
    _paddingLeft = 5;
    [self initView];
}

- (void)setFrame:(CGRect)frame
{
    [super setFrame:frame];
    
    [self.bgView setFrame:self.bounds];
    
    [self updateLayout];
}

- (void)initView
{
    self.bgView = [[UIView alloc] init];
    self.bgView.userInteractionEnabled = NO;
    self.bgView.backgroundColor = [UIColor colorWithRed:0.776 green:0.157 blue:0.157 alpha:1];
    self.bgView.layer.shadowColor = [UIColor grayColor].CGColor;
    self.bgView.layer.shadowOffset = CGSizeMake(0, 0);
    self.bgView.layer.shadowOpacity = 0.2;
    self.bgView.layer.shouldRasterize = YES;
    [self.bgView setFrame:self.bounds];
    [self addSubview:self.bgView];
    
    self.iconImageView = [[UIImageView alloc] init];
    self.iconImageView.contentMode = UIViewContentModeCenter;
    [self addSubview:self.iconImageView];
    
    self.textLabel = [[UILabel alloc] init];
    self.textLabel.numberOfLines = 1;
    self.textLabel.textColor = [UIColor whiteColor];
    [self.textLabel setFont:[UIFont fontWithName:@"Arial-BoldMT" size:20]];
    [self addSubview:self.textLabel];
    
    [self updateLayout];
    
}

- (void)setIconImage:(UIImage *)iconImage
{
    _iconImage = iconImage;
    [self.iconImageView setImage:self.iconImage];
    
    [self updateLayout];
}

- (void)updateLayout
{
    
    CGFloat selfWidth = CGRectGetWidth(self.bounds);
    CGFloat selfHeight = CGRectGetHeight(self.bounds);
    
    [self.iconImageView setFrame:CGRectMake(self.paddingLeft, 0, selfHeight, selfHeight)];
    if (self.iconImage) {
        [self.textLabel setFrame:CGRectMake(CGRectGetMaxX(self.iconImageView.frame), 0, selfWidth - CGRectGetMaxX(self.iconImageView.frame), selfHeight)];
    } else {
        [self.textLabel setFrame:CGRectMake(self.paddingLeft, 0, selfWidth, selfHeight)];
    }
}

- (void)setPaddingLeft:(CGFloat)paddingLeft
{
    _paddingLeft = paddingLeft;
    
    [self updateLayout];
}

- (void)setObject:(id)object
{
    _object = object;
}

- (void)setText:(NSString *)text
{
    _text = text;
    self.textLabel.text = self.text;
}

- (id)copyWithZone:(NSZone *)zone
{
    IGLDropDownItem *itemCopy = [[IGLDropDownItem alloc] init];
    
    itemCopy.index = _index;
    itemCopy.iconImage = _iconImage;
    itemCopy.object = _object;
    itemCopy.text = _text;
    itemCopy.paddingLeft = _paddingLeft;
    
    return itemCopy;
}

@end
