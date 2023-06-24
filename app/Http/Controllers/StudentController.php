<?php



namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use App\Models\Student;
// use League\Flysystem\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function index()
    {
        return view('student.index');
    }

    public function fetchstudent()
    {
        $students = Student::all();
        return response()->json([
            'students'=>$students,
        ]);
    }

    // public function store(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'name'=> 'required|max:191',
    //         'course'=>'required|max:191',
    //         'email'=>'required|email|max:191',
    //         'phone'=>'required|max:10|min:10',
    //     ]);

    //     if($validator->fails())
    //     {
    //         return response()->json([
    //             'status'=>400,
    //             'errors'=>$validator->getMessageBag()
    //         ]);
    //     }
    //     else
    //     {
    //         $student = new Student;
    //         $student->name = $request->input('name');
    //         $student->course = $request->input('course');
    //         $student->email = $request->input('email');
    //         $student->phone = $request->input('phone');
    //         $student->save();
    //         return response()->json([
    //             'status'=>200,
    //             'message'=>'Student Added Successfully.'
    //         ]);
    //     }

    // }

// Add
 public function store(Request $request){
    //    dd($request->file());
        $validator = Validator::make($request->all(),[
            'name'=> 'required|max:191',
            'course'=>'required|image|mimes:png,jpg,jpqg|max:2048',
            'email'=>'required|email|max:191',
            'phone'=>'required|max:10|min:10',
            
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=>400,
                'errors'=>$validator -> getMessageBag(),
            ]);
        }
        else {
            $student = new Student();
            $student->name = $request -> input('name');
            if ($request -> hasFile('course')) {
                $file = $request->file('course');
                $extension = $file->getClientOriginalExtension();
                $filename = time().'.'.$extension;
                $file -> move('uploads/studens',$filename);
                $student -> course = $filename;
            }
            $student->email = $request -> input('email');
            $student->phone = $request -> input('phone');
            $student->save();


            return response()->json([
                'status' => 200,
                'message' => "Them Thanh Cong",
            ]);
        }
    }


    public function edit($id)
    {
        $student = Student::find($id);
        if($student)
        {
            return response()->json([
                'status'=>200,
                'student'=> $student,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No Student Found.'
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name'=> 'required|max:191',
            'email'=>'required|email|max:191',
            'phone'=>'required|max:10|min:10',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=>400,
                'errors'=>$validator->getMessageBag()
            ]);
        }
        else
        {
            $student = Student::find($id);
            if($student)
            {
                $student->name = $request->input('name');
                if ($request -> hasFile('course')) {
                    $path = 'uploads/studens'.$student->course;

                    if (File::exists($path))
                    {
                            File::delete($path);
                    }

                    $file = $request->file('course');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time().'.'.$extension;
                    $file -> move('uploads/studens',$filename);
                    $student -> course = $filename;
                }
                $student->email = $request->input('email');
                $student->phone = $request->input('phone');
                $student->update();

                return response()->json([
                    'status'=>200,
                    'message'=>'Student Updated Successfully.'
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'No Student Found.'
                ]);
            }

        }
    }

    public function destroy($id)
    {
        $student = Student::find($id);
        if($student)
        {
            $student->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Student Deleted Successfully.'
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No Student Found.'
            ]);
        }
    }
}