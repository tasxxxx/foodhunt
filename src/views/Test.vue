<template>
    <v-app>
      <v-layout>
        <v-app-bar
          color="teal-darken-4"
          image="https://picsum.photos/1920/1080?random"
        >
          <template v-slot:image>
            <v-img
              gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
            ></v-img>
          </template>
  
          <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </template>
  
          <v-app-bar-title>Title</v-app-bar-title>
  
          <v-spacer></v-spacer>
  
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
  
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
  
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar>


  
        <v-main>
            <v-parallax
                src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            >
                <div class="d-flex flex-column fill-height justify-center align-center text-white">
                <h1 class="text-h4 font-weight-thin mb-4">
                    Vuetify
                </h1>
                <h4 class="subheading">
                    Build your application today!
                </h4>
                </div>
            </v-parallax>
          <v-container fluid>
            <v-row dense>
              <v-col
                v-for="n in 4"
                :key="n"
                cols="12"
              >
                <v-card
                  :title="`Content ${n}`"
                  :subtitle="`Subtitle for Content ${n}`"
                  text="Lorem ipsum dolor sit amet consectetur, adipisicing elit.?"
                ></v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-layout>
    </v-app>
  </template>