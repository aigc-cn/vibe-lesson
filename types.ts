
import React from 'react';

export enum ModuleCategory {
  Evaluation = '出访评估',
  Declaration = '预申报',
  ReturnReport = '归国报告',
  Achievements = '成果社区',
  Compliance = '合规管理',
  SystemAdmin = '平台管理',
  Help = '帮助中心'
}

export interface NavItem {
  id: string;
  name: string;
  category: ModuleCategory;
  icon: React.ReactNode;
}

export interface RiskAssessment {
  country: string;
  safetyScore: number;
  politicalStability: number;
  friendlyScore: number;
  warnings: string[];
  suggestions: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  status: 'published' | 'matching' | 'converted';
  valueScore: number;
  matchingRate?: number;
}

export interface User {
  name: string;
  role: string;
  points: number;
}
