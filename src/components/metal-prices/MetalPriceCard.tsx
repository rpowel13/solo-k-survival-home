
import React from 'react';
import { ArrowDown, ArrowUp, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice, formatChange, formatChangePercentage, getChangeColor } from '@/utils/metalPriceUtils';

interface MetalPrice {
  price: number;
  change: number;
  changePercentage: number;
}

interface MetalPriceCardProps {
  name: string;
  data: MetalPrice;
  color: string;
  kitcoUrl: string;
}

const MetalPriceCard = ({ name, data, color, kitcoUrl }: MetalPriceCardProps) => {
  return (
    <Card className={`border-t-4 ${color}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          {name}
          <a 
            href={kitcoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-finance-600 flex items-center"
          >
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2">{formatPrice(data.price)}</div>
        <div className={`flex items-center ${getChangeColor(data.change)}`}>
          {data.change > 0 ? (
            <ArrowUp className="h-4 w-4 mr-1" />
          ) : data.change < 0 ? (
            <ArrowDown className="h-4 w-4 mr-1" />
          ) : null}
          <span>{formatChange(data.change)} ({formatChangePercentage(data.changePercentage)})</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetalPriceCard;
