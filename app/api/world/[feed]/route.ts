import {NextRequest,NextResponse} from 'next/server';
export const dynamic='force-dynamic';
const allowed=new Set(['flights','maritime','fires','weather','gdelt']);
export async function GET(req:NextRequest,{params}:{params:Promise<{feed:string}>}){
 const {feed}=await params;if(!allowed.has(feed))return NextResponse.json({error:'unsupported_feed'},{status:404});
 try{const upstream=await fetch(`https://osirisai.live/api/${feed}`,{headers:{'User-Agent':'DATOVA/0.1 intelligence-research'},next:{revalidate:60}});
 if(!upstream.ok)throw new Error(`upstream_${upstream.status}`);
 const data=await upstream.json();return NextResponse.json({feed,source:'OSIRIS public API',upstream:'https://osirisai.live',fetchedAt:new Date().toISOString(),data},{headers:{'Cache-Control':'public, s-maxage=60, stale-while-revalidate=120'}});
 }catch(e){return NextResponse.json({feed,error:'upstream_unavailable',detail:e instanceof Error?e.message:'unknown'},{status:503})}
}