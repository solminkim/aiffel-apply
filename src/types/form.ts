import { platformOptionsArray } from '@/data/platformOptionsArray';

export const Step = {
  COMMON: 'COMMON',
  DETAIL: 'DETAIL',
  COMPLETE: 'COMPLETE',
} as const;
export const ApplicationStepArray = Object.keys(Step).map(
  (value, index, array) => {
    return value;
  },
);
export type TApplicationStep = typeof Step[keyof typeof Step];

export const Course = {
  RESEARCH: 'RESEARCH',
  CORE: 'CORE',
} as const;
export type TApplicationCourse = typeof Course[keyof typeof Course];
export const ApplicationCourseArray = Object.keys(Course).map(
  (value, index, array) => {
    return value;
  },
);

export const Platform = {
  INSTAGRAM: 'INSTAGRAM',
  FACEBOOK: 'FACEBOOK',
  NAVER: 'NAVER',
  GOOGLE: 'GOOGLE',
  OUTDOOR: 'OUTDOOR',
  KAKAO: 'KAKAO',
  FRIEND: 'FRIEND',
  COMMUNITY: 'COMMUNITY',
  ETC: 'ETC',
} as const;
export type TApplicationPlatform = typeof Platform[keyof typeof Platform];
export const ApplicationPlatformArray = Object.keys(Platform).map(
  (value, index, array) => {
    return value;
  },
);

export const ApplicationApplyPathArray = platformOptionsArray.map(
  (platform) => {
    return platform.value;
  },
);

export type TApplicationApplyPathArray = typeof ApplicationApplyPathArray;

// function stringLiterals<T extends string>(...args: T[]): T[] { return args; }
// type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;

// const values = stringLiterals();
