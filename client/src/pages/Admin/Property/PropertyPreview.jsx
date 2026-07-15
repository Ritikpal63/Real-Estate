export default function PropertyPreview(){

return(

<div className="bg-[#f8f9fd] rounded-3xl p-8">

<h3 className="text-sm text-gray-500 uppercase">
Preview
</h3>

<p className="text-gray-400 text-sm mb-6">
This is how your property will look
</p>

<div className="bg-white rounded-3xl shadow-lg p-5">

<div className="font-bold text-lg">
PROPERTY NAME
</div>

<div className="text-gray-400 text-sm">
LOCATION
</div>

<div className="mt-5 rounded-2xl h-72 bg-gray-100 flex justify-center items-center">

<div className="text-center">

<div className="w-14 h-14 rounded-full border flex justify-center items-center text-3xl mx-auto">
+
</div>

<p className="mt-3 text-gray-400">
Property Images
</p>

</div>

</div>

<div className="flex justify-between mt-5">

<div className="flex -space-x-3">

<img
src="https://i.pravatar.cc/40?img=1"
className="w-8 h-8 rounded-full border"
/>

<img
src="https://i.pravatar.cc/40?img=2"
className="w-8 h-8 rounded-full border"
/>

<img
src="https://i.pravatar.cc/40?img=3"
className="w-8 h-8 rounded-full border"
/>

</div>

<div className="text-gray-400">
❤ 6
</div>

</div>

</div>

</div>

)

}