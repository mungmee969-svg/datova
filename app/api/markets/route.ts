import {NextResponse} from 'next/server';
export async function GET(){return NextResponse.json({status:'not_configured',message:'Market data requires a licensed public redistribution feed. No sample prices are presented as live.',instruments:['Gold','SET','USD/THB','S&P 500'],fetchedAt:null});}
