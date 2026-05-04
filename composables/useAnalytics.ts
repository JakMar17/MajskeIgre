export type AnalyticsEventName =
  | 'concert_spotify_click'
  | 'contact_email_click'
  | 'culture_registration_click'
  | 'footer_app_store_click'
  | 'footer_facebook_click'
  | 'footer_google_play_click'
  | 'footer_instagram_click'
  | 'footer_tiktok_click'
  | 'homepage_app_store_click'
  | 'homepage_facebook_click'
  | 'homepage_google_play_click'
  | 'homepage_instagram_click'
  | 'homepage_kultura_click'
  | 'homepage_sport_click'
  | 'homepage_zabava_click'
  | 'predmajski_teaser_click'
  | 'prireditev_app_store_click'
  | 'prireditev_google_play_click'
  | 'sport_instructions_open'
  | 'sport_registration_click';

export const useAnalytics = () => {
  const trackAnalyticsEvent = (eventName: AnalyticsEventName) => {
    const { trackEvent } = usePlausible();
    trackEvent(eventName);
  };

  return {
    trackAnalyticsEvent,
  };
};
