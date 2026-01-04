"use client";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInAnonymously as firebaseSignInAnonymously,
} from "firebase/auth";
import { useFirebase } from "@/firebase/provider";
import { useToast } from "./use-toast";

export function useAuth() {
  const { auth } = useFirebase();
  const { toast } = useToast();

  const handleAuthError = (error: any) => {
    console.error("Authentication error:", error);
    toast({
      variant: "destructive",
      title: "Authentication Error",
      description: error.message || "An unexpected error occurred.",
    });
    throw error;
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleAuthError(error);
    }
  };
  
  const signInAnonymously = async () => {
    try {
      return await firebaseSignInAnonymously(auth);
    } catch (error) {
      handleAuthError(error);
    }
  }

  const signOut = async () => {
    try {
      return await firebaseSignOut(auth);
    } catch (error) {
      handleAuthError(error);
    }
  };

  return {
    signUpWithEmail,
    signInWithEmail,
    signInAnonymously,
    signOut,
  };
}
