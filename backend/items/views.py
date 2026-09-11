from rest_framework import mixins, viewsets

from .models import Item
from .serializers import ItemSerializer


class ItemViewSet(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    """List, create, retrieve and partially update items."""
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    # Composed from mixins rather than ModelViewSet so no DELETE route exists;
    # PUT is excluded here since the document asks only for PATCH
    http_method_names = ['get', 'post', 'patch', 'head', 'options']
