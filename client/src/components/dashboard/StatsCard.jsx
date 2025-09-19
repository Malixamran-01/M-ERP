import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCard({ title, value, icon: Icon, bgColor, trend, trendType }) {
  return (
    <Card className="relative overflow-hidden bg-white/60 backdrop-blur-sm border-emerald-200/50 hover:shadow-lg transition-all duration-300">
      <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 ${bgColor || 'bg-emerald-500'} rounded-full opacity-10`} />
      <CardHeader className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-emerald-600">{title}</p>
            <CardTitle className="text-2xl md:text-3xl font-bold mt-2 text-emerald-900">
              {value}
            </CardTitle>
          </div>
          <div className={`p-3 rounded-xl ${bgColor || 'bg-emerald-500'} bg-opacity-20`}>
            <Icon className={`w-5 h-5 ${(bgColor || 'bg-emerald-500').replace('bg-', 'text-')}`} />
          </div>
        </div>
        {trend && (
          <div className="flex items-center mt-4 text-sm">
            {trendType === 'up' ? (
              <TrendingUp className="w-4 h-4 mr-1 text-emerald-500" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1 text-red-500" />
            )}
            <span className={`font-medium ${trendType === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
              {trend}
            </span>
          </div>
        )}
      </CardHeader>
    </Card>
  );
}