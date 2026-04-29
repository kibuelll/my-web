import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { name, score } = await req.json();

    if (!name || score === undefined) {
      return NextResponse.json({ error: "Name and score are required" }, { status: 400 });
    }

    // 1. Find or Create Guess User
    let { data: guess, error: fetchError } = await supabase
      .from("guesses")
      .select("id")
      .eq("guess_name", name)
      .single();

    let guessId;

    if (fetchError || !guess) {
      const { data: newGuess, error: insertError } = await supabase
        .from("guesses")
        .insert([{ guess_name: name }])
        .select()
        .single();

      if (insertError) throw insertError;
      guessId = newGuess.id;
    } else {
      guessId = guess.id;

      // Check current high score for this user
      const { data: bestScoreData, error: bestScoreError } = await supabase
        .from("guess_score")
        .select("score")
        .eq("guess_id", guessId)
        .order("score", { ascending: false })
        .limit(1)
        .single();

      if (!bestScoreError && bestScoreData) {
        if (score <= bestScoreData.score) {
          return NextResponse.json({ success: true, message: "Score not higher than highscore" });
        }
      }
    }

    // 2. Insert Score
    const { error: scoreError } = await supabase
      .from("guess_score")
      .insert([
        { 
          score: Math.floor(score), 
          guess_id: guessId 
        }
      ]);

    if (scoreError) {
      console.error("Score Insert Error:", scoreError);
      return NextResponse.json({ error: "Failed to insert score", details: scoreError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Critical Supabase Error:", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Fetch top 10 scores
    const { data, error } = await supabase
      .from("guess_score")
      .select(`
        score,
        guesses (
          guess_name
        )
      `)
      .order("score", { ascending: false })
      .limit(10);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
