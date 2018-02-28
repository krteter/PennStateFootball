

    //<script type="text/javascript">

    import {Alert} from "react-native";




    export const AlertMe = (item)=> {
        Alert.alert(item);
    }


    export const Upload = ()=> {

        Alert.alert('UploadAlert');

        let fileUpload = document.getElementById("fileUpload");
        let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;


         if (regex.test(fileUpload.value.toLowerCase())) {

            if (typeof (FileReader) != "undefined") {

                let reader = new FileReader();
                reader.onload = function (e) {

                    let table = document.createElement("table");
                    let rows = e.target.result.split("\n");

                    for (let i = 0; i < rows.length; i++) {

                        let row = table.insertRow(-1);
                        let cells = rows[i].split(",");

                        for (let j = 0; j < cells.length; j++) {

                            let cell = row.insertCell(-1);
                            cell.innerHTML = cells[j];
                        }
                    }

                    let dvCSV = document.getElementById("dvCSV");
                    dvCSV.innerHTML = "";
                    dvCSV.appendChild(table);

                }

                reader.readAsText(fileUpload.files[0]);

            } else {
                alert("This browser does not support HTML5.");
            }

         } else {
             alert("Please upload a valid CSV file.");
         }

    }  // end Upload()


//</script>