from shop.serializers import UserSerializer

def my_jwt_response_handler(token, user=None, request=None):
    print("This is the output: ", user)
    return {
    'token': token,
    'user': UserSerializer(user, context={'request': request}).data,
    # 'password': UserSerializer(user, context={'request': request}).data,
    }
