<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <h1>Upload an image to remove the background</h1>
            </v-col>
            <v-col class="mb-4">
                <v-card class="mx-auto" max-width="344" outlined>
                    <v-icon size="150px" color="grey" class="iconDrag">
                        mdi-cloud-upload-outline
                    </v-icon>
                    <div class="text-center pa-3">
                        <v-btn color="primary" rounded dark :loading="isSelecting" @click="handleFileImport">
                            Upload File
                        </v-btn>
                        <input ref="uploader" class="inputDrag" type="file" @change="onFileChanged">
                    </div>

                </v-card>
                <div class="text-center mt-5">
                    <v-btn rounded color="primary" dark @click="sendImagetoAction">
                        Convert
                    </v-btn>
                </div>

            </v-col>
            <div v-show="load" class="mx-auto" max-width="344" outlined>
                <h3>Preview Photo</h3>
                <v-img max-height="350" max-width="350" :src="selectedFile"></v-img>
            </div>
            <div v-show="upload" class="mx-auto" max-width="344" outlined>
                <h3>White background Photo</h3><v-img max-height="350" max-width="350" :src="setImage"></v-img>
                <div class="text-center mt-5">
                    <a :href="setImage" download class="text-clr"><v-btn rounded color="primary" dark>
                            Download
                        </v-btn></a>
                </div>
            </div>
        </v-row>
    </v-container>

</template>

<script>


export default {
    name: 'ImageUpload',
    data() {
        return {
            isSelecting: false,
            selectedFile: null,
            load: false,
            upload: false,
        }
    },

    computed: {
        setImage() {
            return this.$store.state.convertImage;
        },
    },

    methods: {
        sendImagetoAction() {
            this.upload = true
            this.$store.dispatch("getRemovedImage", this.selectedFile)
        },

        handleFileImport() {
            this.isSelecting = true;

            // After obtaining the focus when closing the FilePicker, return the button state to normal
            window.addEventListener('focus', () => {
                this.isSelecting = false
            }, { once: true });

            // Trigger click on the FileInput
            this.$refs.uploader.click();

        },
        onFileChanged(e) {
            this.load = true
            // this.selectedFile = e.target.files[0];
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                this.selectedFile = e.target.result;
                //console.log(this.selectedFile);
            };
        },

        // HandleApi() {
        //     console.log("api call")
        //     var myHeaders = new Headers();
        //     myHeaders.append("X-API-Key", "hQ47YLeP6XNe3zQo1tBq5ogP");
        //     myHeaders.append("Content-Type", "application/json");

        //     var raw = JSON.stringify({ "image_file_b64": this.selectedFile });
        //     var requestOptions = {
        //         method: 'POST',
        //         headers: myHeaders,
        //         body: raw,
        //         //redirect: 'follow',
        //         responseType: 'arrayBuffer'


        //     };

        //     const ApiCall = fetch("https://api.remove.bg/v1.0/removebg", requestOptions)
        //         .then(response => response.arrayBuffer())

        //         .then((result) => { return result })
        //         .catch(error => console.log('error', error));


        //     const HandleAPIPost = async () => {
        //         let bufferArray = await ApiCall;
        //         const base64String = btoa([].reduce.call(new Uint8Array(bufferArray), function (p, c) { return p + String.fromCharCode(c) }, ''))
        //         this.removedBg = null;
        //         console.log("chek", this.removedBg)
        //         this.removedBg = 'data:image/jpeg;base64,' + base64String;

        //         // this.removedBg = base64String;
        //         console.log("result of API", base64String)
        //         console.log("response variable", this.removedBg)

        //     }
        //     HandleAPIPost()
        // }

    }
}
</script>

<style scoped>
.text-clr {
    color: white !important;
    text-decoration: none
}

.inputDrag{
  
    opacity: 0 ;
   size: 10px;
  
}

.iconDrag{
  
    opacity: 10px ;
    
    
}
</style>