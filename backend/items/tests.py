from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Item


class ItemAPITests(APITestCase):
    """Covers the constraints and status codes required by the spec."""

    def setUp(self):
        self.list_url = reverse('item-list')
        self.item = Item.objects.create(name='Rock', group=Item.Group.PRIMARY)

    def test_same_name_allowed_in_different_groups(self):
        response = self.client.post(
            self.list_url,
            {'name': 'Rock', 'group': Item.Group.SECONDARY},
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Item.objects.filter(name='Rock').count(), 2)

    def test_duplicate_name_in_same_group_rejected(self):
        response = self.client.post(
            self.list_url,
            {'name': 'Rock', 'group': Item.Group.PRIMARY},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('non_field_errors', response.data)

    def test_invalid_group_rejected(self):
        response = self.client.post(
            self.list_url,
            {'name': 'Paper', 'group': 'tertiary'},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('group', response.data)

    def test_missing_item_returns_404(self):
        url = reverse('item-detail', args=[9999])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_patch_updates_timestamp_but_not_created_at(self):
        url = reverse('item-detail', args=[self.item.pk])
        original_created = self.item.created_at
        original_updated = self.item.updated_at

        response = self.client.patch(url, {'name': 'Stone'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.item.refresh_from_db()
        self.assertEqual(self.item.name, 'Stone')
        self.assertEqual(self.item.created_at, original_created)
        self.assertGreater(self.item.updated_at, original_updated)

    def test_created_at_cannot_be_set_by_client(self):
        response = self.client.post(
            self.list_url,
            {
                'name': 'Paper',
                'group': Item.Group.PRIMARY,
                'created_at': '1999-01-01T00:00:00Z',
            },
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertNotIn('1999', response.data['created_at'])

    def test_name_is_stripped_before_validation(self):
        response = self.client.post(
            self.list_url,
            {'name': '  Rock  ', 'group': Item.Group.PRIMARY},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
