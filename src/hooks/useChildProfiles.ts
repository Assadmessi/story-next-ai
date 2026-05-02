import { useCallback, useEffect, useState } from "react";
import {
    addChildProfile,
    getChildProfiles,
} from "../lib/storage/childProfiles";
import type { ChildProfile } from "../types/child";

export function useChildProfiles() {
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfiles = useCallback(async () => {
    setIsLoading(true);
    const storedProfiles = await getChildProfiles();
    setProfiles(storedProfiles);
    setIsLoading(false);
  }, []);

  const createProfile = useCallback(async (profile: ChildProfile) => {
    const nextProfiles = await addChildProfile(profile);
    setProfiles(nextProfiles);
  }, []);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  return {
    profiles,
    isLoading,
    loadProfiles,
    createProfile,
  };
}
