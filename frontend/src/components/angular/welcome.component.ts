import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Test } from './app/test/test';

interface MessageStats {
  label: string;
  value: number;
  color: string;
  icon: string;
  trend: string;
}

interface Activity {
  message: string;
  time: string;
  type: 'success' | 'info' | 'warning';
  icon: string;
}

@Component({
  selector: 'app-welcome',
  imports: [Test, CommonModule],
  template: `
    <div class="analytics-dashboard">
      <div class="header-section">
        <div class="icon-wrapper">
          <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div>
          <h2 class="title">{{title}}</h2>
          <p class="subtitle">Real-time insights and performance metrics</p>
        </div>
      </div>
      
      <div class="stats-grid">
        <div *ngFor="let stat of stats" class="stat-card" [style.--card-color]="stat.color">
          <div class="stat-header">
            <div class="stat-icon" [innerHTML]="stat.icon"></div>
            <span class="stat-trend" [class.positive]="stat.trend.includes('+')">
              {{ stat.trend }}
            </span>
          </div>
          <div class="stat-content">
            <p class="stat-label">{{stat.label}}</p>
            <p class="stat-value">{{stat.value}}<span *ngIf="stat.label.includes('Rate')">%</span></p>
          </div>
          <div class="stat-progress">
            <div class="progress-bar" [style.width.%]="stat.value > 100 ? 100 : stat.value"></div>
          </div>
        </div>
      </div>

      <div class="activity-section">
        <div class="section-header">
          <h3>Recent Activity</h3>
          <button class="refresh-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Refresh
          </button>
        </div>
        <div class="activity-list">
          <div *ngFor="let activity of recentActivities; let i = index" 
               class="activity-item"
               [class]="'activity-' + activity.type"
               [style.animation-delay]="i * 0.1 + 's'">
            <div class="activity-icon" [innerHTML]="activity.icon"></div>
            <div class="activity-content">
              <span class="activity-message">{{activity.message}}</span>
              <span class="activity-time">{{activity.time}}</span>
            </div>
          </div>
        </div>
      </div>

      <app-test></app-test>
    </div>
  `,
  styles: `
    .analytics-dashboard {
      animation: fadeIn 0.6s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .header-section {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .icon-wrapper {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 16px rgba(239, 68, 68, 0.3);
    }

    .header-icon {
      width: 32px;
      height: 32px;
      color: white;
    }

    .title {
      font-size: 1.875rem;
      font-weight: 800;
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
    }

    .subtitle {
      color: #6b7280;
      font-size: 0.875rem;
      margin: 0.25rem 0 0 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      border: 2px solid #f3f4f6;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      animation: slideIn 0.5s ease-out backwards;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .stat-card:hover {
      border-color: var(--card-color);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      transform: translateY(-4px);
    }

    .stat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .stat-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .stat-trend {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      background: #fee2e2;
      color: #991b1b;
    }

    .stat-trend.positive {
      background: #d1fae5;
      color: #065f46;
    }

    .stat-content {
      margin-bottom: 0.75rem;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0 0 0.5rem 0;
      font-weight: 500;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 800;
      color: #1f2937;
      margin: 0;
      line-height: 1;
    }

    .stat-value span {
      font-size: 1.5rem;
      color: #9ca3af;
    }

    .stat-progress {
      height: 6px;
      background: #f3f4f6;
      border-radius: 9999px;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      background: var(--card-color);
      border-radius: 9999px;
      transition: width 1s ease-out;
    }

    .activity-section {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      border: 2px solid #f3f4f6;
      margin-bottom: 2rem;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .section-header h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .refresh-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: #f3f4f6;
      border: none;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .refresh-btn:hover {
      background: #e5e7eb;
      color: #374151;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 12px;
      border: 2px solid #f3f4f6;
      transition: all 0.3s ease;
      animation: slideIn 0.5s ease-out backwards;
    }

    .activity-item:hover {
      border-color: #e5e7eb;
      background: #fafafa;
    }

    .activity-success {
      border-left: 4px solid #10b981;
    }

    .activity-info {
      border-left: 4px solid #3b82f6;
    }

    .activity-warning {
      border-left: 4px solid #f59e0b;
    }

    .activity-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      background: #f9fafb;
    }

    .activity-content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .activity-message {
      font-size: 0.875rem;
      color: #374151;
      font-weight: 500;
    }

    .activity-time {
      font-size: 0.75rem;
      color: #9ca3af;
      white-space: nowrap;
    }
  `
})

export default class AngularWelcome {
  title = 'SMS Analytics Dashboard';
  
  stats: MessageStats[] = [
    { 
      label: 'Messages Sent Today', 
      value: 1247, 
      color: '#3b82f6',
      icon: '📤',
      trend: '+12.5%'
    },
    { 
      label: 'Delivery Rate', 
      value: 98, 
      color: '#10b981',
      icon: '✅',
      trend: '+2.1%'
    },
    { 
      label: 'Active Contacts', 
      value: 456, 
      color: '#f59e0b',
      icon: '👥',
      trend: '+8.3%'
    }
  ];

  recentActivities: Activity[] = [
    { 
      message: 'Bulk SMS sent to 150 contacts', 
      time: '2 min ago',
      type: 'success',
      icon: '🚀'
    },
    { 
      message: 'New contact added: Sarah Wilson', 
      time: '15 min ago',
      type: 'info',
      icon: '➕'
    },
    { 
      message: 'Scheduled message sent successfully', 
      time: '1 hour ago',
      type: 'success',
      icon: '⏰'
    },
    { 
      message: 'Low credit warning: 50 messages remaining', 
      time: '2 hours ago',
      type: 'warning',
      icon: '⚠️'
    }
  ];
}