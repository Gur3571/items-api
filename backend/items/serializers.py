from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    """
    Translates Item database records into JSON for API clients, and validates
    incoming JSON data when creating or updating items.
    """
    class Meta:
        model = Item
        fields = ['id', 'name', 'group', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
        # Mirrors the UniqueConstraint on the model. Declared explicitly so the
        # rule is visible here and the error message is fit to display.
        validators = [
            UniqueTogetherValidator(
                queryset=Item.objects.all(),
                fields=['name', 'group'],
                message='An item with this name already exists in this group.',
            )
        ]
    
    def validate_name(self, value):
        # Trailing whitespace would otherwise create a near-duplicate
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Name cannot be blank.')
        return value