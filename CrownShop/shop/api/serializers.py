from rest_framework import serializers
from shop.models import Item, Order, OrderItem, Coupon
from django.core.exceptions import ObjectDoesNotExist


class StringSerializer(serializers.StringRelatedField): 
    def to_internal_value(self, value): 
        return value

class CouponSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Coupon
        fields = (
            'id',
            'code',
            'amount', 
        ) 

class ItemSerializer(serializers.ModelSerializer): 
    category = serializers.SerializerMethodField()
    label = serializers.SerializerMethodField()
    class Meta: 
        model = Item
        fields = (
            'id',
            'title',
            'price',
            'discount_price',
            'category',
            'label',
            'slug',
            'description',
            'quantity',
            'image',
        )

    def get_category(self, obj): 
        return obj.get_category_display()

    def get_label(self, obj): 
        return obj.get_label_display()


class OrderItemSerializer(serializers.ModelSerializer): 
    item = StringSerializer()
    item_obj = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()
    class Meta: 
        model = OrderItem
        fields = (
            'id',
            'item',
            'item_obj',
            'quantity',
            'final_price'
        )
    def get_item_obj(self, obj):
        return ItemSerializer(obj.item).data

    def get_final_price(self, obj): 
        return obj.get_final_price()

class OrderSerializer(serializers.ModelSerializer): 
    order_items = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    coupon = serializers.SerializerMethodField()

    class Meta: 
        model = Order
        fields = (
            'id',
            'order_items',
            'total',
            'coupon',
        )

    def get_order_items(self, obj):
        orders = obj.items.all()
        print(f"This is order items {orders}")
        try:
            return OrderItemSerializer(obj.items.all(), many=True).data
        except ObjectDoesNotExist:
            return null

    
    def get_total(self, obj):
        return obj.get_total() 

    def get_coupon(self, obj): 
        if obj.coupon is not None:
            return CouponSerializer(obj.coupon).data
        return None
