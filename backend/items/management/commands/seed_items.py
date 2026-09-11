from django.core.management.base import BaseCommand

from items.models import Item


class Command(BaseCommand):
    help = 'Populates the database with sample items.'

    def handle(self, *args, **options):
        Item.objects.all().delete()

        # 'Rock' and 'Paper' appear in both groups to demonstrate that names
        # are unique per group rather than globally
        samples = [
            ('Rock', Item.Group.PRIMARY),
            ('Rock', Item.Group.SECONDARY),
            ('Paper', Item.Group.PRIMARY),
            ('Paper', Item.Group.SECONDARY),
            ('Scissors', Item.Group.PRIMARY),
            ('Lizard', Item.Group.SECONDARY),
        ]

        for name, group in samples:
            Item.objects.create(name=name, group=group)

        self.stdout.write(
            self.style.SUCCESS(f'Created {len(samples)} items.')
        )