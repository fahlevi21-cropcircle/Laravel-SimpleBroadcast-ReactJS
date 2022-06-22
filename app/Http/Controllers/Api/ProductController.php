<?php

namespace App\Http\Controllers\Api;

use App\Events\ProductCreatedEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProductResource::collection(Product::orderBy('updated_at', 'desc')->cursor());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        if(!$request->validated()){
            return response()->json(['error' => 'An error occured!'], 401);
        }

        $data = [
            'id' => Str::uuid(),
            'name' => $request->get('name'),
        ];

        $insert = Product::create($data);

        if(!$insert){
            return response()->json(['error' => 'An error occured!'], 401);
        }

        // trigger event
        // ProductCreatedEvent::dispatch($insert);
        event(new ProductCreatedEvent($insert));

        return response()->json(['success' => 'Data created!'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $delete = $product->delete();

        if(!$delete){
            return response()->json(['error' => 'An error occured'], 401);
        }

        return response()->json(['success' => $delete]);
    }
}
