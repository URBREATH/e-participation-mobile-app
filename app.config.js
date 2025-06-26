export default {
  expo: {
    name: "URBREATH",
    slug: "urbreath",
    scheme: "com.urbreath.app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon_logo.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/icon_logo.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    entryPoint: "./App.js",
    updates: {
      url: "EXPO_UPDATE_URL"
    },
    runtimeVersion: "1.0.0",
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.urbreath.app",
      config: {
        googleMapsApiKey: "YOUR_API_KEY"
      },
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "This app needs access to location services to show your position on the map.",
        NSLocationAlwaysAndWhenInUseUsageDescription: "This app needs access to location services to show your position on the map.",
        UIBackgroundModes: ["location", "fetch"],
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true,
          NSExceptionDomains: {
            "BACKEND_URL": {
              NSExceptionAllowsInsecureHTTPLoads: true,
              NSIncludesSubdomains: true
            }
          }
        }
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon_logo.png",
        backgroundColor: "#ffffff",
        resizeMode: "contain"
      },
      config: {
        googleMaps: {
          apiKey: "YOUR_API_KEY",
        },
      },
      package: "com.urbreath.app"
    },
    web: {
      favicon: "./assets/icon_logo.png"
    },

    plugins: [
      "patch-project",
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow URBREATH to use your location to show nearby activities and mark your position on the map."
        }
      ]
    ],

    extra: {
      eas: {
        projectId: "PROJECT_ID"
      },
      GOOGLE_MAPS_ANDROID_API_KEY: "YOUR_API_KEY",
      GOOGLE_MAPS_IOS_API_KEY: "YOUR_API_KEY",
      BACKEND_API_URL: "BACKEND_URL",
      DECIDIM_KEYCLOAK_URL: "DECIDIM_KEYCLOAK_URL",
      DECIDIM_KEYCLOAK_CLIENT_ID: "DECIDIM_KEYCLOAK_CLIENT_ID",
      DECIDIM_KEYCLOAK_CLIENT_SECRET: "DECIDIM_CLIENT_SECRET",
      ATHENS_KEYCLOAK_URL: "ATHENS_KEYCLOAK_URL",
      ATHENS_KEYCLOAK_CLIENT_ID: "ATHENS_KEYCLOAK_CLIENT_ID",
      ATHENS_KEYCLOAK_CLIENT_SECRET: "DECIDIM_CLIENT_SECRET",
      PARMA_KEYCLOAK_URL: "PARMA_KEYCLOAK_URL",
      PARMA_KEYCLOAK_CLIENT_ID: "PARMA_KEYCLOAK_CLIENT_ID",
      PARMA_KEYCLOAK_CLIENT_SECRET: "DECIDIM_CLIENT_SECRET",
    },
    owner: "telesto.dev"
  }
};