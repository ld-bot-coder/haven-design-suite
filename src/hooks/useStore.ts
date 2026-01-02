import { useSyncExternalStore, useCallback } from "react";
import { store } from "@/lib/store";

export function useEnquiries() {
  const enquiries = useSyncExternalStore(
    (callback) => store.subscribe(callback),
    () => store.getEnquiries()
  );

  return {
    enquiries,
    addEnquiry: store.addEnquiry.bind(store),
    updateEnquiry: store.updateEnquiry.bind(store),
    deleteEnquiry: store.deleteEnquiry.bind(store),
  };
}

export function useAppointments() {
  const appointments = useSyncExternalStore(
    (callback) => store.subscribe(callback),
    () => store.getAppointments()
  );

  return {
    appointments,
    addAppointment: store.addAppointment.bind(store),
    updateAppointment: store.updateAppointment.bind(store),
    deleteAppointment: store.deleteAppointment.bind(store),
  };
}

export function useGallery() {
  const gallery = useSyncExternalStore(
    (callback) => store.subscribe(callback),
    () => store.getGallery()
  );

  return {
    gallery,
    addGalleryItem: store.addGalleryItem.bind(store),
    updateGalleryItem: store.updateGalleryItem.bind(store),
    deleteGalleryItem: store.deleteGalleryItem.bind(store),
  };
}

export function useContent() {
  const content = useSyncExternalStore(
    (callback) => store.subscribe(callback),
    () => store.getContent()
  );

  return {
    content,
    addContent: store.addContent.bind(store),
    updateContent: store.updateContent.bind(store),
    deleteContent: store.deleteContent.bind(store),
  };
}

export function useSettings() {
  const settings = useSyncExternalStore(
    (callback) => store.subscribe(callback),
    () => store.getSettings()
  );

  return {
    settings,
    updateSettings: store.updateSettings.bind(store),
  };
}
