//
//  TBAAward.h
//  TBAKit
//
//  Created by Arsh Malhotra on 10/25/15.
//  Copyright © 2015 LRT. All rights reserved.
//

#import "TBAModel.h"

typedef NS_ENUM(NSInteger, TBAAwardType) {
    TBAAwardTypeChairmans = 0,
    TBAAwardTypeWinner,
    TBAAwardTypeFinalist,
    TBAAwardTypeWoodieFlowers,
    TBAAwardTypeDeansList,
    TBAAwardTypeVolunteer,
    TBAAwardTypeFounders,
    TBAAwardTypeBartKamenMemorial,
    TBAAwardTypeMakeItLoud,
    TBAAwardTypeEngineeringInspiration,
    TBAAwardTypeRookieAllStar,
    TBAAwardTypeGraciousProfessionalism,
    TBAAwardTypeCoopertition,
    TBAAwardTypeJudges,
    TBAAwardTypeHighestRookieSeed,
    TBAAwardTypeRookieInspiration,
    TBAAwardTypeIndustrialDeesign,
    TBAAwardTypeQuality,
    TBAAwardTypeSafety,
    TBAAwardTypeSportsmanship,
    TBAAwardTypeCreativity,
    TBAAwardTypeEngineeringExcellence,
    TBAAwardTypeEntrepreneurship,
    TBAAwardTypeExcellenceInDesign,
    TBAAwardTypeExcellenceInDesignCad,
    TBAAwardTypeExcellenceInDesignAnimation,
    TBAAwardTypeDrivingTomorrowsTechnology,
    TBAAwardTypeImagery,
    TBAAwardTypeMediaAndTechnology,
    TBAAwardTypeInnovationInControl,
    TBAAwardTypeSpirit,
    TBAAwardTypeWebsite,
    TBAAwardTypeVisualization,
    TBAAwardTypeAutodeskInventor,
    TBAAwardTypeFutureInnovator,
    TBAAwardTypeRecognitionOfExtraordinaryService,
    TBAAwardTypeOutstandingCart,
    TBAAwardTypeWsuAimHigher,
    TBAAwardTypeLeadershipInControl,
    TBAAwardTypeNum1Seed,
    TBAAwardTypeIncrediblePlay,
    TBAAwardTypePeoplesChoiceAnimation,
    TBAAwardTypeVisualizationRisingStar,
    TBAAwardTypeBestOffensiveRound,
    TBAAwardTypeBestPlayOfTheDay,
    TBAAwardTypeFeatherweightInTheFinals,
    TBAAwardTypeMostPhotogenic,
    TBAAwardTypeOutstandingDefense,
    TBAAwardTypePowerToSimplify,
    TBAAwardTypeAgainstAllOdds,
    TBAAwardTypeRisingStar,
    TBAAwardTypeChairmansHonorableMention,
    TBAAwardTypeContentCommunicationHonorableMention,
    TBAAwardTypeTechnicalExecutionHonorableMention,
    TBAAwardTypeRealization,
    TBAAwardTypeRealizationHonorableMention,
    TBAAwardTypeDesignYourFuture,
    TBAAwardTypeDesignYourFutureHonorableMention,
    TBAAwardTypeSpecialRecognitionCharacterAnimation,
    TBAAwardTypeHighScore,
    TBAAwardTypeTeacherPioneerteacherRaftsmanship,
    TBAAwardTypeBestDefensiveMatch,
    TBAAwardTypePlayOfTheDay,
    TBAAwardTypeProgramming,
    TBAAwardTypeProfessionalism
};

@interface TBAAwardRecipient : TBAModel

@property (nonatomic, assign) NSInteger teamNumber;
@property (nonatomic, strong) NSString *awardee;

@end

@interface TBAAward : TBAModel

@property (nonatomic, strong) NSString *name;
@property (nonatomic, assign) TBAAwardType awardType;
@property (nonatomic, strong) NSString *eventKey;
@property (nonatomic, strong) NSArray *recipientList;
@property (nonatomic, assign) NSInteger year;

@end