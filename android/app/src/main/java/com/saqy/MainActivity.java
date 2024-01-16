package com.saqy;

import com.facebook.react.ReactActivity;

import android.os.Bundle;

import android.content.Intent;

import org.devio.rn.splashscreen.SplashScreen;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
    intent.putExtras(this.getIntent());
  }

  @Override
  protected String getMainComponentName() {
    return "Saqy";
  }
}
