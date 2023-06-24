  $(document).ready(function () {

        // fetchstudent();

        // function fetchstudent() {
        //     $.ajax({
        //         type: "GET",
        //         url: "/fetch-students",
        //         dataType: "json",
        //         success: function (response) {
        //             // console.log(response);
        //             $('tbody').html("");
        //             $.each(response.students, function (key, item) {
        //                 $('tbody').append('<tr>\
        //                     <td>' + item.id + '</td>\
        //                     <td>' + item.name + '</td>\
        //                     <td>' + item.course + '</td>\
        //                     <td>' + item.email + '</td>\
        //                     <td>' + item.phone + '</td>\
        //                     <td><button type="button" value="' + item.id + '" class="btn btn-primary editbtn btn-sm">Edit</button></td>\
        //                     <td><button type="button" value="' + item.id + '" class="btn btn-danger deletebtn btn-sm">Delete</button></td>\
        //                 \</tr>');
        //             });
        //         }
        //     });
        // }

        $(document).on('click','#add_student', function(e){
            e.preventDefault();

            // $(this).text('Sending..');

            var data = {
                'name': $('#name').val(),
                'course': $('#course').val(),
                'email': $('#email').val(),
                'phone': $('#phone').val(),
                
            }

            $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });

            $.ajax({
                type: "POST",
                    url: "/students",
                    data: data,     
                    dataType: "json",
                success: function (response) {
                    // console.log(response);
                    if (response.status == 400) {
                        $('#save_msgList').html("");
                        $('#save_msgList').addClass('alert alert-danger');
                        $.each(response.errors, function (key, err_value) {
                            $('#save_msgList').append('<li>' + err_value + '</li>');
                            
                        });
                        // $('.add_student').text('Save');
                    } else {
                        $('#save_msgList').html("");
                        $('#success_message').addClass('alert alert-success');
                        $('#success_message').text(response.message);
                        $('#AddStudentModal').find('input').val('');
                        // $('.add_student').text('Save');
                        $('#AddStudentModal').modal('hide');
                        // fetchstudent();
                    }
                }
            });

        });

        // $(document).on('click', '.editbtn', function (e) {
        //     e.preventDefault();
        //     var stud_id = $(this).val();
        //     // alert(stud_id);
        //     $('#editModal').modal('show');
        //     $.ajax({
        //         type: "GET",
        //         url: "/edit-student/" + stud_id,
        //         success: function (response) {
        //             if (response.status == 404) {
        //                 $('#success_message').addClass('alert alert-success');
        //                 $('#success_message').text(response.message);
        //                 $('#editModal').modal('hide');
        //             } else {
        //                 // console.log(response.student.name);
        //                 $('#name').val(response.student.name);
        //                 $('#course').val(response.student.course);
        //                 $('#email').val(response.student.email);
        //                 $('#phone').val(response.student.phone);
        //                 $('#stud_id').val(stud_id);
        //             }
        //         }
        //     });
        //     $('.btn-close').find('input').val('');

        // });

    //     $(document).on('click', '.update_student', function (e) {
    //         e.preventDefault();

    //         $(this).text('Updating..');
    //         var id = $('#stud_id').val();
    //         // alert(id);

    //         var data = {
    //             'name': $('#name').val(),
    //             'course': $('#course').val(),
    //             'email': $('#email').val(),
    //             'phone': $('#phone').val(),
    //         }

    //         $.ajaxSetup({
    //             headers: {
    //                 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //             }
    //         });

    //         $.ajax({
    //             type: "PUT",
    //             url: "/update-student/" + id,
    //             data: data,
    //             dataType: "json",
    //             success: function (response) {
    //                 // console.log(response);
    //                 if (response.status == 400) {
    //                     $('#update_msgList').html("");
    //                     $('#update_msgList').addClass('alert alert-danger');
    //                     $.each(response.errors, function (key, err_value) {
    //                         $('#update_msgList').append('<li>' + err_value +
    //                             '</li>');
    //                     });
    //                     $('.update_student').text('Update');
    //                 } else {
    //                     $('#update_msgList').html("");

    //                     $('#success_message').addClass('alert alert-success');
    //                     $('#success_message').text(response.message);
    //                     $('#editModal').find('input').val('');
    //                     $('.update_student').text('Update');
    //                     $('#editModal').modal('hide');
    //                     fetchstudent();
    //                 }
    //             }
    //         });

    //     });

    //     $(document).on('click', '.deletebtn', function () {
    //         var stud_id = $(this).val();
    //         $('#DeleteModal').modal('show');
    //         $('#deleteing_id').val(stud_id);
    //     });

    //     $(document).on('click', '.delete_student', function (e) {
    //         e.preventDefault();

    //         $(this).text('Deleting..');
    //         var id = $('#deleteing_id').val();

    //         $.ajaxSetup({
    //             headers: {
    //                 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //             }
    //         });

    //         $.ajax({
    //             type: "DELETE",
    //             url: "/delete-student/" + id,
    //             dataType: "json",
    //             success: function (response) {
    //                 // console.log(response);
    //                 if (response.status == 404) {
    //                     $('#success_message').addClass('alert alert-success');
    //                     $('#success_message').text(response.message);
    //                     $('.delete_student').text('Yes Delete');
    //                 } else {
    //                     $('#success_message').html("");
    //                     $('#success_message').addClass('alert alert-success');
    //                     $('#success_message').text(response.message);
    //                     $('.delete_student').text('Yes Delete');
    //                     $('#DeleteModal').modal('hide');
    //                     fetchstudent();
    //                 }
    //             }
    //         });
    //     });

    });
